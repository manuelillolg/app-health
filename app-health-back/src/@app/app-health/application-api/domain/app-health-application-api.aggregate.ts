/* eslint-disable key-spacing */
import { AggregateRoot } from '@nestjs/cqrs';
import { LiteralObject, Utils } from '@aurorajs.dev/core';
import {
    AppHealthApplicationApiId,
    AppHealthApplicationApiApplicationId,
    AppHealthApplicationApiApiInterfaceTypeId,
    AppHealthApplicationApiScore,
    AppHealthApplicationApiDocumentations,
    AppHealthApplicationApiRequestsPerDay,
    AppHealthApplicationApiApplicationInfrastructureServiceId,
    AppHealthApplicationApiCreatedAt,
    AppHealthApplicationApiUpdatedAt,
    AppHealthApplicationApiDeletedAt,
} from './value-objects';
import { AppHealthCreatedApplicationApiEvent } from '../application/events/app-health-created-application-api.event';
import { AppHealthUpdatedApplicationApiEvent } from '../application/events/app-health-updated-application-api.event';
import { AppHealthDeletedApplicationApiEvent } from '../application/events/app-health-deleted-application-api.event';
import { AppHealthApplication } from '@app/app-health/application';
import { AppHealthApiInterfaceType } from '@app/app-health/api-interface-type';
import { AppHealthApplicationInfrastructureService } from '@app/app-health/application-infrastructure-service';

export class AppHealthApplicationApi extends AggregateRoot
{
    id: AppHealthApplicationApiId;
    applicationId: AppHealthApplicationApiApplicationId;
    apiInterfaceTypeId: AppHealthApplicationApiApiInterfaceTypeId;
    score: AppHealthApplicationApiScore;
    documentations: AppHealthApplicationApiDocumentations;
    requestsPerDay: AppHealthApplicationApiRequestsPerDay;
    applicationInfrastructureServiceId: AppHealthApplicationApiApplicationInfrastructureServiceId;
    createdAt: AppHealthApplicationApiCreatedAt;
    updatedAt: AppHealthApplicationApiUpdatedAt;
    deletedAt: AppHealthApplicationApiDeletedAt;

    // eager relationship
    application: AppHealthApplication;
    apiInterfaceType: AppHealthApiInterfaceType;
    applicationInfrastructureService: AppHealthApplicationInfrastructureService;

    constructor(
        id: AppHealthApplicationApiId,
        applicationId: AppHealthApplicationApiApplicationId,
        apiInterfaceTypeId: AppHealthApplicationApiApiInterfaceTypeId,
        score: AppHealthApplicationApiScore,
        documentations: AppHealthApplicationApiDocumentations,
        requestsPerDay: AppHealthApplicationApiRequestsPerDay,
        applicationInfrastructureServiceId: AppHealthApplicationApiApplicationInfrastructureServiceId,
        createdAt: AppHealthApplicationApiCreatedAt,
        updatedAt: AppHealthApplicationApiUpdatedAt,
        deletedAt: AppHealthApplicationApiDeletedAt,

        application?: AppHealthApplication,
        apiInterfaceType?: AppHealthApiInterfaceType,
        applicationInfrastructureService?: AppHealthApplicationInfrastructureService,
    )
    {
        super();
        this.id = id;
        this.applicationId = applicationId;
        this.apiInterfaceTypeId = apiInterfaceTypeId;
        this.score = score;
        this.documentations = documentations;
        this.requestsPerDay = requestsPerDay;
        this.applicationInfrastructureServiceId = applicationInfrastructureServiceId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;

        // eager relationship
        this.application = application;
        this.apiInterfaceType = apiInterfaceType;
        this.applicationInfrastructureService = applicationInfrastructureService;
    }

    static register (
        id: AppHealthApplicationApiId,
        applicationId: AppHealthApplicationApiApplicationId,
        apiInterfaceTypeId: AppHealthApplicationApiApiInterfaceTypeId,
        score: AppHealthApplicationApiScore,
        documentations: AppHealthApplicationApiDocumentations,
        requestsPerDay: AppHealthApplicationApiRequestsPerDay,
        applicationInfrastructureServiceId: AppHealthApplicationApiApplicationInfrastructureServiceId,
        createdAt: AppHealthApplicationApiCreatedAt,
        updatedAt: AppHealthApplicationApiUpdatedAt,
        deletedAt: AppHealthApplicationApiDeletedAt,

        application?: AppHealthApplication,
        apiInterfaceType?: AppHealthApiInterfaceType,
        applicationInfrastructureService?: AppHealthApplicationInfrastructureService,
    ): AppHealthApplicationApi
    {
        return new AppHealthApplicationApi(
            id,
            applicationId,
            apiInterfaceTypeId,
            score,
            documentations,
            requestsPerDay,
            applicationInfrastructureServiceId,
            createdAt,
            updatedAt,
            deletedAt,

            application,
            apiInterfaceType,
            applicationInfrastructureService,
        );
    }

    created(applicationApi: AppHealthApplicationApi): void
    {
        this.apply(
            new AppHealthCreatedApplicationApiEvent(
                applicationApi.id.value,
                applicationApi.applicationId.value,
                applicationApi.apiInterfaceTypeId.value,
                applicationApi.score.value,
                applicationApi.documentations?.value,
                applicationApi.requestsPerDay?.value,
                applicationApi.applicationInfrastructureServiceId.value,
                applicationApi.createdAt?.value,
                applicationApi.updatedAt?.value,
                applicationApi.deletedAt?.value,
            ),
        );
    }

    updated(applicationApi: AppHealthApplicationApi): void
    {
        this.apply(
            new AppHealthUpdatedApplicationApiEvent(
                applicationApi.id?.value,
                applicationApi.applicationId?.value,
                applicationApi.apiInterfaceTypeId?.value,
                applicationApi.score?.value,
                applicationApi.documentations?.value,
                applicationApi.requestsPerDay?.value,
                applicationApi.applicationInfrastructureServiceId?.value,
                applicationApi.createdAt?.value,
                applicationApi.updatedAt?.value,
                applicationApi.deletedAt?.value,
            ),
        );
    }

    deleted(applicationApi: AppHealthApplicationApi): void
    {
        this.apply(
            new AppHealthDeletedApplicationApiEvent(
                applicationApi.id.value,
                applicationApi.applicationId.value,
                applicationApi.apiInterfaceTypeId.value,
                applicationApi.score.value,
                applicationApi.documentations?.value,
                applicationApi.requestsPerDay?.value,
                applicationApi.applicationInfrastructureServiceId.value,
                applicationApi.createdAt?.value,
                applicationApi.updatedAt?.value,
                applicationApi.deletedAt?.value,
            ),
        );
    }

    toDTO(): LiteralObject
    {
        return {
            id: this.id.value,
            applicationId: this.applicationId.value,
            apiInterfaceTypeId: this.apiInterfaceTypeId.value,
            score: this.score.value,
            documentations: this.documentations?.value,
            requestsPerDay: this.requestsPerDay?.value,
            applicationInfrastructureServiceId: this.applicationInfrastructureServiceId.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
            application: this.application?.toDTO(),
            apiInterfaceType: this.apiInterfaceType?.toDTO(),
            applicationInfrastructureService: this.applicationInfrastructureService?.toDTO(),
        };
    }

    // function called to get data for repository side effect methods
    toRepository(): LiteralObject
    {
        return {
            id: this.id.value,
            applicationId: this.applicationId.value,
            apiInterfaceTypeId: this.apiInterfaceTypeId.value,
            score: this.score.value,
            documentations: this.documentations?.value,
            requestsPerDay: this.requestsPerDay?.value,
            applicationInfrastructureServiceId: this.applicationInfrastructureServiceId.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
            application: this.application?.toDTO(),
            apiInterfaceType: this.apiInterfaceType?.toDTO(),
            applicationInfrastructureService: this.applicationInfrastructureService?.toDTO(),
        };
    }
}
