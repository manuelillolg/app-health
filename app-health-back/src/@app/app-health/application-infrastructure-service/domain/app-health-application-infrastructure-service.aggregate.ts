/* eslint-disable key-spacing */
import { AggregateRoot } from '@nestjs/cqrs';
import { LiteralObject, Utils } from '@aurorajs.dev/core';
import {
    AppHealthApplicationInfrastructureServiceId,
    AppHealthApplicationInfrastructureServiceApplicationId,
    AppHealthApplicationInfrastructureServiceInfrastructureServiceId,
    AppHealthApplicationInfrastructureServiceAverageCostPerYear,
    AppHealthApplicationInfrastructureServiceScore,
    AppHealthApplicationInfrastructureServiceCreatedAt,
    AppHealthApplicationInfrastructureServiceUpdatedAt,
    AppHealthApplicationInfrastructureServiceDeletedAt,
} from './value-objects';
import { AppHealthCreatedApplicationInfrastructureServiceEvent } from '../application/events/app-health-created-application-infrastructure-service.event';
import { AppHealthUpdatedApplicationInfrastructureServiceEvent } from '../application/events/app-health-updated-application-infrastructure-service.event';
import { AppHealthDeletedApplicationInfrastructureServiceEvent } from '../application/events/app-health-deleted-application-infrastructure-service.event';
import { AppHealthApplication } from '@app/app-health/application';
import { AppHealthInfrastructureService } from '@app/app-health/infrastructure-service';

export class AppHealthApplicationInfrastructureService extends AggregateRoot
{
    id: AppHealthApplicationInfrastructureServiceId;
    applicationId: AppHealthApplicationInfrastructureServiceApplicationId;
    infrastructureServiceId: AppHealthApplicationInfrastructureServiceInfrastructureServiceId;
    averageCostPerYear: AppHealthApplicationInfrastructureServiceAverageCostPerYear;
    score: AppHealthApplicationInfrastructureServiceScore;
    createdAt: AppHealthApplicationInfrastructureServiceCreatedAt;
    updatedAt: AppHealthApplicationInfrastructureServiceUpdatedAt;
    deletedAt: AppHealthApplicationInfrastructureServiceDeletedAt;

    // eager relationship
    application: AppHealthApplication;
    infrastructureService: AppHealthInfrastructureService;

    constructor(
        id: AppHealthApplicationInfrastructureServiceId,
        applicationId: AppHealthApplicationInfrastructureServiceApplicationId,
        infrastructureServiceId: AppHealthApplicationInfrastructureServiceInfrastructureServiceId,
        averageCostPerYear: AppHealthApplicationInfrastructureServiceAverageCostPerYear,
        score: AppHealthApplicationInfrastructureServiceScore,
        createdAt: AppHealthApplicationInfrastructureServiceCreatedAt,
        updatedAt: AppHealthApplicationInfrastructureServiceUpdatedAt,
        deletedAt: AppHealthApplicationInfrastructureServiceDeletedAt,

        application?: AppHealthApplication,
        infrastructureService?: AppHealthInfrastructureService,
    )
    {
        super();
        this.id = id;
        this.applicationId = applicationId;
        this.infrastructureServiceId = infrastructureServiceId;
        this.averageCostPerYear = averageCostPerYear;
        this.score = score;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;

        // eager relationship
        this.application = application;
        this.infrastructureService = infrastructureService;
    }

    static register (
        id: AppHealthApplicationInfrastructureServiceId,
        applicationId: AppHealthApplicationInfrastructureServiceApplicationId,
        infrastructureServiceId: AppHealthApplicationInfrastructureServiceInfrastructureServiceId,
        averageCostPerYear: AppHealthApplicationInfrastructureServiceAverageCostPerYear,
        score: AppHealthApplicationInfrastructureServiceScore,
        createdAt: AppHealthApplicationInfrastructureServiceCreatedAt,
        updatedAt: AppHealthApplicationInfrastructureServiceUpdatedAt,
        deletedAt: AppHealthApplicationInfrastructureServiceDeletedAt,

        application?: AppHealthApplication,
        infrastructureService?: AppHealthInfrastructureService,
    ): AppHealthApplicationInfrastructureService
    {
        return new AppHealthApplicationInfrastructureService(
            id,
            applicationId,
            infrastructureServiceId,
            averageCostPerYear,
            score,
            createdAt,
            updatedAt,
            deletedAt,

            application,
            infrastructureService,
        );
    }

    created(applicationInfrastructureService: AppHealthApplicationInfrastructureService): void
    {
        this.apply(
            new AppHealthCreatedApplicationInfrastructureServiceEvent(
                applicationInfrastructureService.id.value,
                applicationInfrastructureService.applicationId.value,
                applicationInfrastructureService.infrastructureServiceId.value,
                applicationInfrastructureService.averageCostPerYear?.value,
                applicationInfrastructureService.score.value,
                applicationInfrastructureService.createdAt?.value,
                applicationInfrastructureService.updatedAt?.value,
                applicationInfrastructureService.deletedAt?.value,
            ),
        );
    }

    updated(applicationInfrastructureService: AppHealthApplicationInfrastructureService): void
    {
        this.apply(
            new AppHealthUpdatedApplicationInfrastructureServiceEvent(
                applicationInfrastructureService.id?.value,
                applicationInfrastructureService.applicationId?.value,
                applicationInfrastructureService.infrastructureServiceId?.value,
                applicationInfrastructureService.averageCostPerYear?.value,
                applicationInfrastructureService.score?.value,
                applicationInfrastructureService.createdAt?.value,
                applicationInfrastructureService.updatedAt?.value,
                applicationInfrastructureService.deletedAt?.value,
            ),
        );
    }

    deleted(applicationInfrastructureService: AppHealthApplicationInfrastructureService): void
    {
        this.apply(
            new AppHealthDeletedApplicationInfrastructureServiceEvent(
                applicationInfrastructureService.id.value,
                applicationInfrastructureService.applicationId.value,
                applicationInfrastructureService.infrastructureServiceId.value,
                applicationInfrastructureService.averageCostPerYear?.value,
                applicationInfrastructureService.score.value,
                applicationInfrastructureService.createdAt?.value,
                applicationInfrastructureService.updatedAt?.value,
                applicationInfrastructureService.deletedAt?.value,
            ),
        );
    }

    toDTO(): LiteralObject
    {
        return {
            id: this.id.value,
            applicationId: this.applicationId.value,
            infrastructureServiceId: this.infrastructureServiceId.value,
            averageCostPerYear: this.averageCostPerYear?.value,
            score: this.score.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
            application: this.application?.toDTO(),
            infrastructureService: this.infrastructureService?.toDTO(),
        };
    }

    // function called to get data for repository side effect methods
    toRepository(): LiteralObject
    {
        return {
            id: this.id.value,
            applicationId: this.applicationId.value,
            infrastructureServiceId: this.infrastructureServiceId.value,
            averageCostPerYear: this.averageCostPerYear?.value,
            score: this.score.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
            application: this.application?.toDTO(),
            infrastructureService: this.infrastructureService?.toDTO(),
        };
    }
}
