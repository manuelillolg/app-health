import { AppHealthAddAuthenticationInterfacesContextEvent, AppHealthIAuthenticationInterfaceRepository } from '@app/app-health/authentication-interface';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AppHealthDeleteAuthenticationInterfacesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIAuthenticationInterfaceRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get objects to delete
        const authenticationInterfaces = await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });

        if (authenticationInterfaces.length === 0) return;

        await this.repository.delete({
            queryStatement,
            constraint,
            cQMetadata,
            deleteOptions: cQMetadata?.repositoryOptions,
        });

        // create AddAuthenticationInterfacesContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const authenticationInterfacesRegistered = this.publisher.mergeObjectContext(
            new AppHealthAddAuthenticationInterfacesContextEvent(authenticationInterfaces),
        );

        authenticationInterfacesRegistered.deleted(); // apply event to model events
        authenticationInterfacesRegistered.commit(); // commit all events of model
    }
}
