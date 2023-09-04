/* eslint-disable key-spacing */
import { AggregateRoot } from '@nestjs/cqrs';
import { LiteralObject, Utils } from '@aurorajs.dev/core';
import {
    AppHealthApplicationAuthorizationId,
    AppHealthApplicationAuthorizationApplicationId,
    AppHealthApplicationAuthorizationAuthorizationInterfaceId,
    AppHealthApplicationAuthorizationTotalUsers,
    AppHealthApplicationAuthorizationScore,
    AppHealthApplicationAuthorizationApplicationInfrastructureServiceId,
    AppHealthApplicationAuthorizationCreatedAt,
    AppHealthApplicationAuthorizationUpdatedAt,
    AppHealthApplicationAuthorizationDeletedAt,
} from './value-objects';
import { AppHealthCreatedApplicationAuthorizationEvent } from '../application/events/app-health-created-application-authorization.event';
import { AppHealthUpdatedApplicationAuthorizationEvent } from '../application/events/app-health-updated-application-authorization.event';
import { AppHealthDeletedApplicationAuthorizationEvent } from '../application/events/app-health-deleted-application-authorization.event';
import { AppHealthApplication } from '@app/app-health/application';
import { AppHealthAuthorizationInterface } from '@app/app-health/authorization-interface';
import { AppHealthApplicationInfrastructureService } from '@app/app-health/application-infrastructure-service';

export class AppHealthApplicationAuthorization extends AggregateRoot
{
    id: AppHealthApplicationAuthorizationId;
    applicationId: AppHealthApplicationAuthorizationApplicationId;
    authorizationInterfaceId: AppHealthApplicationAuthorizationAuthorizationInterfaceId;
    totalUsers: AppHealthApplicationAuthorizationTotalUsers;
    score: AppHealthApplicationAuthorizationScore;
    applicationInfrastructureServiceId: AppHealthApplicationAuthorizationApplicationInfrastructureServiceId;
    createdAt: AppHealthApplicationAuthorizationCreatedAt;
    updatedAt: AppHealthApplicationAuthorizationUpdatedAt;
    deletedAt: AppHealthApplicationAuthorizationDeletedAt;

    // eager relationship
    application: AppHealthApplication;
    authorizationInterface: AppHealthAuthorizationInterface;
    applicationInfrastructureService: AppHealthApplicationInfrastructureService;

    constructor(
        id: AppHealthApplicationAuthorizationId,
        applicationId: AppHealthApplicationAuthorizationApplicationId,
        authorizationInterfaceId: AppHealthApplicationAuthorizationAuthorizationInterfaceId,
        totalUsers: AppHealthApplicationAuthorizationTotalUsers,
        score: AppHealthApplicationAuthorizationScore,
        applicationInfrastructureServiceId: AppHealthApplicationAuthorizationApplicationInfrastructureServiceId,
        createdAt: AppHealthApplicationAuthorizationCreatedAt,
        updatedAt: AppHealthApplicationAuthorizationUpdatedAt,
        deletedAt: AppHealthApplicationAuthorizationDeletedAt,

        application?: AppHealthApplication,
        authorizationInterface?: AppHealthAuthorizationInterface,
        applicationInfrastructureService?: AppHealthApplicationInfrastructureService,
    )
    {
        super();
        this.id = id;
        this.applicationId = applicationId;
        this.authorizationInterfaceId = authorizationInterfaceId;
        this.totalUsers = totalUsers;
        this.score = score;
        this.applicationInfrastructureServiceId = applicationInfrastructureServiceId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;

        // eager relationship
        this.application = application;
        this.authorizationInterface = authorizationInterface;
        this.applicationInfrastructureService = applicationInfrastructureService;
    }

    static register (
        id: AppHealthApplicationAuthorizationId,
        applicationId: AppHealthApplicationAuthorizationApplicationId,
        authorizationInterfaceId: AppHealthApplicationAuthorizationAuthorizationInterfaceId,
        totalUsers: AppHealthApplicationAuthorizationTotalUsers,
        score: AppHealthApplicationAuthorizationScore,
        applicationInfrastructureServiceId: AppHealthApplicationAuthorizationApplicationInfrastructureServiceId,
        createdAt: AppHealthApplicationAuthorizationCreatedAt,
        updatedAt: AppHealthApplicationAuthorizationUpdatedAt,
        deletedAt: AppHealthApplicationAuthorizationDeletedAt,

        application?: AppHealthApplication,
        authorizationInterface?: AppHealthAuthorizationInterface,
        applicationInfrastructureService?: AppHealthApplicationInfrastructureService,
    ): AppHealthApplicationAuthorization
    {
        return new AppHealthApplicationAuthorization(
            id,
            applicationId,
            authorizationInterfaceId,
            totalUsers,
            score,
            applicationInfrastructureServiceId,
            createdAt,
            updatedAt,
            deletedAt,

            application,
            authorizationInterface,
            applicationInfrastructureService,
        );
    }

    created(applicationAuthorization: AppHealthApplicationAuthorization): void
    {
        this.apply(
            new AppHealthCreatedApplicationAuthorizationEvent(
                applicationAuthorization.id.value,
                applicationAuthorization.applicationId.value,
                applicationAuthorization.authorizationInterfaceId.value,
                applicationAuthorization.totalUsers?.value,
                applicationAuthorization.score.value,
                applicationAuthorization.applicationInfrastructureServiceId.value,
                applicationAuthorization.createdAt?.value,
                applicationAuthorization.updatedAt?.value,
                applicationAuthorization.deletedAt?.value,
            ),
        );
    }

    updated(applicationAuthorization: AppHealthApplicationAuthorization): void
    {
        this.apply(
            new AppHealthUpdatedApplicationAuthorizationEvent(
                applicationAuthorization.id?.value,
                applicationAuthorization.applicationId?.value,
                applicationAuthorization.authorizationInterfaceId?.value,
                applicationAuthorization.totalUsers?.value,
                applicationAuthorization.score?.value,
                applicationAuthorization.applicationInfrastructureServiceId?.value,
                applicationAuthorization.createdAt?.value,
                applicationAuthorization.updatedAt?.value,
                applicationAuthorization.deletedAt?.value,
            ),
        );
    }

    deleted(applicationAuthorization: AppHealthApplicationAuthorization): void
    {
        this.apply(
            new AppHealthDeletedApplicationAuthorizationEvent(
                applicationAuthorization.id.value,
                applicationAuthorization.applicationId.value,
                applicationAuthorization.authorizationInterfaceId.value,
                applicationAuthorization.totalUsers?.value,
                applicationAuthorization.score.value,
                applicationAuthorization.applicationInfrastructureServiceId.value,
                applicationAuthorization.createdAt?.value,
                applicationAuthorization.updatedAt?.value,
                applicationAuthorization.deletedAt?.value,
            ),
        );
    }

    toDTO(): LiteralObject
    {
        return {
            id: this.id.value,
            applicationId: this.applicationId.value,
            authorizationInterfaceId: this.authorizationInterfaceId.value,
            totalUsers: this.totalUsers?.value,
            score: this.score.value,
            applicationInfrastructureServiceId: this.applicationInfrastructureServiceId.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
            application: this.application?.toDTO(),
            authorizationInterface: this.authorizationInterface?.toDTO(),
            applicationInfrastructureService: this.applicationInfrastructureService?.toDTO(),
        };
    }

    // function called to get data for repository side effect methods
    toRepository(): LiteralObject
    {
        return {
            id: this.id.value,
            applicationId: this.applicationId.value,
            authorizationInterfaceId: this.authorizationInterfaceId.value,
            totalUsers: this.totalUsers?.value,
            score: this.score.value,
            applicationInfrastructureServiceId: this.applicationInfrastructureServiceId.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
            application: this.application?.toDTO(),
            authorizationInterface: this.authorizationInterface?.toDTO(),
            applicationInfrastructureService: this.applicationInfrastructureService?.toDTO(),
        };
    }
}
