import { AppHealthAddApplicationAuthenticationsContextEvent, AppHealthIApplicationAuthenticationRepository } from '@app/app-health/application-authentication';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AppHealthDeleteApplicationAuthenticationsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIApplicationAuthenticationRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get objects to delete
        const applicationAuthentications = await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });

        if (applicationAuthentications.length === 0) return;

        await this.repository.delete({
            queryStatement,
            constraint,
            cQMetadata,
            deleteOptions: cQMetadata?.repositoryOptions,
        });

        // create AddApplicationAuthenticationsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const applicationAuthenticationsRegistered = this.publisher.mergeObjectContext(
            new AppHealthAddApplicationAuthenticationsContextEvent(applicationAuthentications),
        );

        applicationAuthenticationsRegistered.deleted(); // apply event to model events
        applicationAuthenticationsRegistered.commit(); // commit all events of model
    }
}
