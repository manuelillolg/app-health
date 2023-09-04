import { AppHealthApplicationView, AppHealthIApplicationViewRepository } from '@app/app-health/application-view';
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
export class AppHealthCreateApplicationViewService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIApplicationViewRepository,
    ) {}

    async main(
        payload: {
            id: AppHealthApplicationViewId;
            applicationId: AppHealthApplicationViewApplicationId;
            totalViews: AppHealthApplicationViewTotalViews;
            complexity: AppHealthApplicationViewComplexity;
            description: AppHealthApplicationViewDescription;
            score: AppHealthApplicationViewScore;
        },
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const applicationView = AppHealthApplicationView.register(
            payload.id,
            payload.applicationId,
            payload.totalViews,
            payload.complexity,
            payload.description,
            payload.score,
            new AppHealthApplicationViewCreatedAt({ currentTimestamp: true }),
            new AppHealthApplicationViewUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        await this.repository.create(
            applicationView,
            {
                createOptions: cQMetadata?.repositoryOptions,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const applicationViewRegister = this.publisher.mergeObjectContext(
            applicationView,
        );

        applicationViewRegister.created(applicationView); // apply event to model events
        applicationViewRegister.commit(); // commit all events of model
    }
}
