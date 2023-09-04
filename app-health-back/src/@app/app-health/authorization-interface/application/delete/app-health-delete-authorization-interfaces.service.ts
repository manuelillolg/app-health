import { AppHealthAddAuthorizationInterfacesContextEvent, AppHealthIAuthorizationInterfaceRepository } from '@app/app-health/authorization-interface';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AppHealthDeleteAuthorizationInterfacesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIAuthorizationInterfaceRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get objects to delete
        const authorizationInterfaces = await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });

        if (authorizationInterfaces.length === 0) return;

        await this.repository.delete({
            queryStatement,
            constraint,
            cQMetadata,
            deleteOptions: cQMetadata?.repositoryOptions,
        });

        // create AddAuthorizationInterfacesContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const authorizationInterfacesRegistered = this.publisher.mergeObjectContext(
            new AppHealthAddAuthorizationInterfacesContextEvent(authorizationInterfaces),
        );

        authorizationInterfacesRegistered.deleted(); // apply event to model events
        authorizationInterfacesRegistered.commit(); // commit all events of model
    }
}
