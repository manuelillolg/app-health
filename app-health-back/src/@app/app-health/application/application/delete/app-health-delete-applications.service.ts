import { AppHealthAddApplicationsContextEvent, AppHealthIApplicationRepository } from '@app/app-health/application';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AppHealthDeleteApplicationsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIApplicationRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get objects to delete
        const applications = await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });

        if (applications.length === 0) return;

        await this.repository.delete({
            queryStatement,
            constraint,
            cQMetadata,
            deleteOptions: cQMetadata?.repositoryOptions,
        });

        // create AddApplicationsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const applicationsRegistered = this.publisher.mergeObjectContext(
            new AppHealthAddApplicationsContextEvent(applications),
        );

        applicationsRegistered.deleted(); // apply event to model events
        applicationsRegistered.commit(); // commit all events of model
    }
}
