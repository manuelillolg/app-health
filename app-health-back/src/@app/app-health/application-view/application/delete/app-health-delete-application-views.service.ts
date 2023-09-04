import { AppHealthAddApplicationViewsContextEvent, AppHealthIApplicationViewRepository } from '@app/app-health/application-view';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AppHealthDeleteApplicationViewsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIApplicationViewRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get objects to delete
        const applicationViews = await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });

        if (applicationViews.length === 0) return;

        await this.repository.delete({
            queryStatement,
            constraint,
            cQMetadata,
            deleteOptions: cQMetadata?.repositoryOptions,
        });

        // create AddApplicationViewsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const applicationViewsRegistered = this.publisher.mergeObjectContext(
            new AppHealthAddApplicationViewsContextEvent(applicationViews),
        );

        applicationViewsRegistered.deleted(); // apply event to model events
        applicationViewsRegistered.commit(); // commit all events of model
    }
}
