import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import {
    AppHealthApplicationViewId,
    AppHealthApplicationViewApplicationId,
    AppHealthApplicationViewTotalViews,
    AppHealthApplicationViewComplexity,
    AppHealthApplicationViewDescription,
    AppHealthApplicationViewScore,
    AppHealthApplicationViewCreatedAt,
    AppHealthApplicationViewUpdatedAt,
    AppHealthApplicationViewDeletedAt,
} from '../../domain/value-objects';
import { AppHealthIApplicationViewRepository } from '../../domain/app-health-application-view.repository';
import { AppHealthApplicationView } from '../../domain/app-health-application-view.aggregate';
import { AppHealthAddApplicationViewsContextEvent } from '../events/app-health-add-application-views-context.event';

@Injectable()
export class AppHealthUpdateApplicationViewsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIApplicationViewRepository,
    ) {}

    async main(
        payload: {
            id?: AppHealthApplicationViewId;
            applicationId?: AppHealthApplicationViewApplicationId;
            totalViews?: AppHealthApplicationViewTotalViews;
            complexity?: AppHealthApplicationViewComplexity;
            description?: AppHealthApplicationViewDescription;
            score?: AppHealthApplicationViewScore;
        },
        queryStatement?: QueryStatement,
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


        // update
        await this.repository.update(
            applicationView,
            {
                queryStatement,
                constraint,
                cQMetadata,
                updateOptions: cQMetadata?.repositoryOptions,
            },
        );

        // get objects to delete
        const applicationViews = await this.repository.get(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const applicationViewsRegister = this.publisher.mergeObjectContext(
            new AppHealthAddApplicationViewsContextEvent(applicationViews),
        );

        applicationViewsRegister.updated(); // apply event to model events
        applicationViewsRegister.commit(); // commit all events of model
    }
}
