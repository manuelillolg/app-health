/* eslint-disable key-spacing */
import { AggregateRoot } from '@nestjs/cqrs';
import { LiteralObject, Utils } from '@aurorajs.dev/core';
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
} from './value-objects';
import { AppHealthCreatedApplicationViewEvent } from '../application/events/app-health-created-application-view.event';
import { AppHealthUpdatedApplicationViewEvent } from '../application/events/app-health-updated-application-view.event';
import { AppHealthDeletedApplicationViewEvent } from '../application/events/app-health-deleted-application-view.event';
import { AppHealthApplication } from '@app/app-health/application';

export class AppHealthApplicationView extends AggregateRoot
{
    id: AppHealthApplicationViewId;
    applicationId: AppHealthApplicationViewApplicationId;
    totalViews: AppHealthApplicationViewTotalViews;
    complexity: AppHealthApplicationViewComplexity;
    description: AppHealthApplicationViewDescription;
    score: AppHealthApplicationViewScore;
    createdAt: AppHealthApplicationViewCreatedAt;
    updatedAt: AppHealthApplicationViewUpdatedAt;
    deletedAt: AppHealthApplicationViewDeletedAt;

    // eager relationship
    application: AppHealthApplication;

    constructor(
        id: AppHealthApplicationViewId,
        applicationId: AppHealthApplicationViewApplicationId,
        totalViews: AppHealthApplicationViewTotalViews,
        complexity: AppHealthApplicationViewComplexity,
        description: AppHealthApplicationViewDescription,
        score: AppHealthApplicationViewScore,
        createdAt: AppHealthApplicationViewCreatedAt,
        updatedAt: AppHealthApplicationViewUpdatedAt,
        deletedAt: AppHealthApplicationViewDeletedAt,

        application?: AppHealthApplication,
    )
    {
        super();
        this.id = id;
        this.applicationId = applicationId;
        this.totalViews = totalViews;
        this.complexity = complexity;
        this.description = description;
        this.score = score;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;

        // eager relationship
        this.application = application;
    }

    static register (
        id: AppHealthApplicationViewId,
        applicationId: AppHealthApplicationViewApplicationId,
        totalViews: AppHealthApplicationViewTotalViews,
        complexity: AppHealthApplicationViewComplexity,
        description: AppHealthApplicationViewDescription,
        score: AppHealthApplicationViewScore,
        createdAt: AppHealthApplicationViewCreatedAt,
        updatedAt: AppHealthApplicationViewUpdatedAt,
        deletedAt: AppHealthApplicationViewDeletedAt,

        application?: AppHealthApplication,
    ): AppHealthApplicationView
    {
        return new AppHealthApplicationView(
            id,
            applicationId,
            totalViews,
            complexity,
            description,
            score,
            createdAt,
            updatedAt,
            deletedAt,

            application,
        );
    }

    created(applicationView: AppHealthApplicationView): void
    {
        this.apply(
            new AppHealthCreatedApplicationViewEvent(
                applicationView.id.value,
                applicationView.applicationId.value,
                applicationView.totalViews.value,
                applicationView.complexity.value,
                applicationView.description?.value,
                applicationView.score.value,
                applicationView.createdAt?.value,
                applicationView.updatedAt?.value,
                applicationView.deletedAt?.value,
            ),
        );
    }

    updated(applicationView: AppHealthApplicationView): void
    {
        this.apply(
            new AppHealthUpdatedApplicationViewEvent(
                applicationView.id?.value,
                applicationView.applicationId?.value,
                applicationView.totalViews?.value,
                applicationView.complexity?.value,
                applicationView.description?.value,
                applicationView.score?.value,
                applicationView.createdAt?.value,
                applicationView.updatedAt?.value,
                applicationView.deletedAt?.value,
            ),
        );
    }

    deleted(applicationView: AppHealthApplicationView): void
    {
        this.apply(
            new AppHealthDeletedApplicationViewEvent(
                applicationView.id.value,
                applicationView.applicationId.value,
                applicationView.totalViews.value,
                applicationView.complexity.value,
                applicationView.description?.value,
                applicationView.score.value,
                applicationView.createdAt?.value,
                applicationView.updatedAt?.value,
                applicationView.deletedAt?.value,
            ),
        );
    }

    toDTO(): LiteralObject
    {
        return {
            id: this.id.value,
            applicationId: this.applicationId.value,
            totalViews: this.totalViews.value,
            complexity: this.complexity.value,
            description: this.description?.value,
            score: this.score.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
            application: this.application?.toDTO(),
        };
    }

    // function called to get data for repository side effect methods
    toRepository(): LiteralObject
    {
        return {
            id: this.id.value,
            applicationId: this.applicationId.value,
            totalViews: this.totalViews.value,
            complexity: this.complexity.value,
            description: this.description?.value,
            score: this.score.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
            application: this.application?.toDTO(),
        };
    }
}
