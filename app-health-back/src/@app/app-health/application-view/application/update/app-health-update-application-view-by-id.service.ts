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
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AppHealthUpdateApplicationViewByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIApplicationViewRepository,
    ) {}

    async main(
        payload: {
            id: AppHealthApplicationViewId;
            applicationId?: AppHealthApplicationViewApplicationId;
            totalViews?: AppHealthApplicationViewTotalViews;
            complexity?: AppHealthApplicationViewComplexity;
            description?: AppHealthApplicationViewDescription;
            score?: AppHealthApplicationViewScore;
        },
        constraint?: QueryStatement,
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
            null, // createdAt
            new AppHealthApplicationViewUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        // update by id
        await this.repository.updateById(
            applicationView,
            {
                constraint,
                cQMetadata,
                updateByIdOptions: cQMetadata?.repositoryOptions,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const applicationViewRegister = this.publisher.mergeObjectContext(
            applicationView,
        );

        applicationViewRegister.updated(applicationView); // apply event to model events
        applicationViewRegister.commit(); // commit all events of model
    }
}
