/* eslint-disable key-spacing */
import { AggregateRoot } from '@nestjs/cqrs';
import { LiteralObject, Utils } from '@aurorajs.dev/core';
import {
    AppHealthApplicationAuthenticationId,
    AppHealthApplicationAuthenticationApplicationId,
    AppHealthApplicationAuthenticationAuthenticationInterfaceId,
    AppHealthApplicationAuthenticationTotalUsers,
    AppHealthApplicationAuthenticationScore,
    AppHealthApplicationAuthenticationApplicationInfrastructureServiceId,
    AppHealthApplicationAuthenticationCreatedAt,
    AppHealthApplicationAuthenticationUpdatedAt,
    AppHealthApplicationAuthenticationDeletedAt,
} from './value-objects';
import { AppHealthCreatedApplicationAuthenticationEvent } from '../application/events/app-health-created-application-authentication.event';
import { AppHealthUpdatedApplicationAuthenticationEvent } from '../application/events/app-health-updated-application-authentication.event';
import { AppHealthDeletedApplicationAuthenticationEvent } from '../application/events/app-health-deleted-application-authentication.event';
import { AppHealthApplication } from '@app/app-health/application';
import { AppHealthAuthenticationInterface } from '@app/app-health/authentication-interface';
import { AppHealthApplicationInfrastructureService } from '@app/app-health/application-infrastructure-service';

export class AppHealthApplicationAuthentication extends AggregateRoot
{
    id: AppHealthApplicationAuthenticationId;
    applicationId: AppHealthApplicationAuthenticationApplicationId;
    authenticationInterfaceId: AppHealthApplicationAuthenticationAuthenticationInterfaceId;
    totalUsers: AppHealthApplicationAuthenticationTotalUsers;
    score: AppHealthApplicationAuthenticationScore;
    applicationInfrastructureServiceId: AppHealthApplicationAuthenticationApplicationInfrastructureServiceId;
    createdAt: AppHealthApplicationAuthenticationCreatedAt;
    updatedAt: AppHealthApplicationAuthenticationUpdatedAt;
    deletedAt: AppHealthApplicationAuthenticationDeletedAt;

    // eager relationship
    application: AppHealthApplication;
    authenticationInterface: AppHealthAuthenticationInterface;
    applicationInfrastructureService: AppHealthApplicationInfrastructureService;

    constructor(
        id: AppHealthApplicationAuthenticationId,
        applicationId: AppHealthApplicationAuthenticationApplicationId,
        authenticationInterfaceId: AppHealthApplicationAuthenticationAuthenticationInterfaceId,
        totalUsers: AppHealthApplicationAuthenticationTotalUsers,
        score: AppHealthApplicationAuthenticationScore,
        applicationInfrastructureServiceId: AppHealthApplicationAuthenticationApplicationInfrastructureServiceId,
        createdAt: AppHealthApplicationAuthenticationCreatedAt,
        updatedAt: AppHealthApplicationAuthenticationUpdatedAt,
        deletedAt: AppHealthApplicationAuthenticationDeletedAt,

        application?: AppHealthApplication,
        authenticationInterface?: AppHealthAuthenticationInterface,
        applicationInfrastructureService?: AppHealthApplicationInfrastructureService,
    )
    {
        super();
        this.id = id;
        this.applicationId = applicationId;
        this.authenticationInterfaceId = authenticationInterfaceId;
        this.totalUsers = totalUsers;
        this.score = score;
        this.applicationInfrastructureServiceId = applicationInfrastructureServiceId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;

        // eager relationship
        this.application = application;
        this.authenticationInterface = authenticationInterface;
        this.applicationInfrastructureService = applicationInfrastructureService;
    }

    static register (
        id: AppHealthApplicationAuthenticationId,
        applicationId: AppHealthApplicationAuthenticationApplicationId,
        authenticationInterfaceId: AppHealthApplicationAuthenticationAuthenticationInterfaceId,
        totalUsers: AppHealthApplicationAuthenticationTotalUsers,
        score: AppHealthApplicationAuthenticationScore,
        applicationInfrastructureServiceId: AppHealthApplicationAuthenticationApplicationInfrastructureServiceId,
        createdAt: AppHealthApplicationAuthenticationCreatedAt,
        updatedAt: AppHealthApplicationAuthenticationUpdatedAt,
        deletedAt: AppHealthApplicationAuthenticationDeletedAt,

        application?: AppHealthApplication,
        authenticationInterface?: AppHealthAuthenticationInterface,
        applicationInfrastructureService?: AppHealthApplicationInfrastructureService,
    ): AppHealthApplicationAuthentication
    {
        return new AppHealthApplicationAuthentication(
            id,
            applicationId,
            authenticationInterfaceId,
            totalUsers,
            score,
            applicationInfrastructureServiceId,
            createdAt,
            updatedAt,
            deletedAt,

            application,
            authenticationInterface,
            applicationInfrastructureService,
        );
    }

    created(applicationAuthentication: AppHealthApplicationAuthentication): void
    {
        this.apply(
            new AppHealthCreatedApplicationAuthenticationEvent(
                applicationAuthentication.id.value,
                applicationAuthentication.applicationId.value,
                applicationAuthentication.authenticationInterfaceId.value,
                applicationAuthentication.totalUsers?.value,
                applicationAuthentication.score.value,
                applicationAuthentication.applicationInfrastructureServiceId.value,
                applicationAuthentication.createdAt?.value,
                applicationAuthentication.updatedAt?.value,
                applicationAuthentication.deletedAt?.value,
            ),
        );
    }

    updated(applicationAuthentication: AppHealthApplicationAuthentication): void
    {
        this.apply(
            new AppHealthUpdatedApplicationAuthenticationEvent(
                applicationAuthentication.id?.value,
                applicationAuthentication.applicationId?.value,
                applicationAuthentication.authenticationInterfaceId?.value,
                applicationAuthentication.totalUsers?.value,
                applicationAuthentication.score?.value,
                applicationAuthentication.applicationInfrastructureServiceId?.value,
                applicationAuthentication.createdAt?.value,
                applicationAuthentication.updatedAt?.value,
                applicationAuthentication.deletedAt?.value,
            ),
        );
    }

    deleted(applicationAuthentication: AppHealthApplicationAuthentication): void
    {
        this.apply(
            new AppHealthDeletedApplicationAuthenticationEvent(
                applicationAuthentication.id.value,
                applicationAuthentication.applicationId.value,
                applicationAuthentication.authenticationInterfaceId.value,
                applicationAuthentication.totalUsers?.value,
                applicationAuthentication.score.value,
                applicationAuthentication.applicationInfrastructureServiceId.value,
                applicationAuthentication.createdAt?.value,
                applicationAuthentication.updatedAt?.value,
                applicationAuthentication.deletedAt?.value,
            ),
        );
    }

    toDTO(): LiteralObject
    {
        return {
            id: this.id.value,
            applicationId: this.applicationId.value,
            authenticationInterfaceId: this.authenticationInterfaceId.value,
            totalUsers: this.totalUsers?.value,
            score: this.score.value,
            applicationInfrastructureServiceId: this.applicationInfrastructureServiceId.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
            application: this.application?.toDTO(),
            authenticationInterface: this.authenticationInterface?.toDTO(),
            applicationInfrastructureService: this.applicationInfrastructureService?.toDTO(),
        };
    }

    // function called to get data for repository side effect methods
    toRepository(): LiteralObject
    {
        return {
            id: this.id.value,
            applicationId: this.applicationId.value,
            authenticationInterfaceId: this.authenticationInterfaceId.value,
            totalUsers: this.totalUsers?.value,
            score: this.score.value,
            applicationInfrastructureServiceId: this.applicationInfrastructureServiceId.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
            application: this.application?.toDTO(),
            authenticationInterface: this.authenticationInterface?.toDTO(),
            applicationInfrastructureService: this.applicationInfrastructureService?.toDTO(),
        };
    }
}
