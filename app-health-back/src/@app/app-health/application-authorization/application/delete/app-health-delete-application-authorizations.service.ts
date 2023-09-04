import { AppHealthAddApplicationAuthorizationsContextEvent, AppHealthIApplicationAuthorizationRepository } from '@app/app-health/application-authorization';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AppHealthDeleteApplicationAuthorizationsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIApplicationAuthorizationRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get objects to delete
        const applicationAuthorizations = await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });

        if (applicationAuthorizations.length === 0) return;

        await this.repository.delete({
            queryStatement,
            constraint,
            cQMetadata,
            deleteOptions: cQMetadata?.repositoryOptions,
        });

        // create AddApplicationAuthorizationsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const applicationAuthorizationsRegistered = this.publisher.mergeObjectContext(
            new AppHealthAddApplicationAuthorizationsContextEvent(applicationAuthorizations),
        );

        applicationAuthorizationsRegistered.deleted(); // apply event to model events
        applicationAuthorizationsRegistered.commit(); // commit all events of model
    }
}
