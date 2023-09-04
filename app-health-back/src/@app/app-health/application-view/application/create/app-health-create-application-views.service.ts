import { AppHealthAddApplicationViewsContextEvent, AppHealthApplicationView, AppHealthIApplicationViewRepository } from '@app/app-health/application-view';
import {
    AppHealthApplicationViewApplicationId,
    AppHealthApplicationViewComplexity,
    AppHealthApplicationViewCreatedAt,
    AppHealthApplicationViewDeletedAt,
    AppHealthApplicationViewDescription,
    AppHealthApplicationViewId,
    AppHealthApplicationViewScore,
    AppHealthApplicationViewTotalViews,
    AppHealthApplicationViewUpdatedAt,
} from '@app/app-health/application-view/domain/value-objects';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AppHealthCreateApplicationViewsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIApplicationViewRepository,
    ) {}

    async main(
        applicationViews: {
            id: AppHealthApplicationViewId;
            applicationId: AppHealthApplicationViewApplicationId;
            totalViews: AppHealthApplicationViewTotalViews;
            complexity: AppHealthApplicationViewComplexity;
            description: AppHealthApplicationViewDescription;
            score: AppHealthApplicationViewScore;
        } [],
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateApplicationViews = applicationViews.map(applicationView => AppHealthApplicationView.register(
            applicationView.id,
            applicationView.applicationId,
            applicationView.totalViews,
            applicationView.complexity,
            applicationView.description,
            applicationView.score,
            new AppHealthApplicationViewCreatedAt({ currentTimestamp: true }),
            new AppHealthApplicationViewUpdatedAt({ currentTimestamp: true }),
            null, // deleteAt
        ));

        // insert
        await this.repository.insert(
            aggregateApplicationViews,
            {
                insertOptions: cQMetadata?.repositoryOptions,
            },
        );

        // create AddApplicationViewsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const applicationViewsRegistered = this.publisher.mergeObjectContext(new AppHealthAddApplicationViewsContextEvent(aggregateApplicationViews));

        applicationViewsRegistered.created(); // apply event to model events
        applicationViewsRegistered.commit(); // commit all events of model
    }
}
