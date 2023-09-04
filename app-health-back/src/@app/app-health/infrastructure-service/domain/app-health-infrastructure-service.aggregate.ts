/* eslint-disable key-spacing */
import { AggregateRoot } from '@nestjs/cqrs';
import { LiteralObject, Utils } from '@aurorajs.dev/core';
import {
    AppHealthInfrastructureServiceId,
    AppHealthInfrastructureServiceProviderId,
    AppHealthInfrastructureServiceName,
    AppHealthInfrastructureServiceScore,
    AppHealthInfrastructureServiceCreatedAt,
    AppHealthInfrastructureServiceUpdatedAt,
    AppHealthInfrastructureServiceDeletedAt,
} from './value-objects';
import { AppHealthCreatedInfrastructureServiceEvent } from '../application/events/app-health-created-infrastructure-service.event';
import { AppHealthUpdatedInfrastructureServiceEvent } from '../application/events/app-health-updated-infrastructure-service.event';
import { AppHealthDeletedInfrastructureServiceEvent } from '../application/events/app-health-deleted-infrastructure-service.event';
import { AppHealthInfrastructureProvider } from '@app/app-health/infrastructure-provider';

export class AppHealthInfrastructureService extends AggregateRoot
{
    id: AppHealthInfrastructureServiceId;
    providerId: AppHealthInfrastructureServiceProviderId;
    name: AppHealthInfrastructureServiceName;
    score: AppHealthInfrastructureServiceScore;
    createdAt: AppHealthInfrastructureServiceCreatedAt;
    updatedAt: AppHealthInfrastructureServiceUpdatedAt;
    deletedAt: AppHealthInfrastructureServiceDeletedAt;

    // eager relationship
    provider: AppHealthInfrastructureProvider;

    constructor(
        id: AppHealthInfrastructureServiceId,
        providerId: AppHealthInfrastructureServiceProviderId,
        name: AppHealthInfrastructureServiceName,
        score: AppHealthInfrastructureServiceScore,
        createdAt: AppHealthInfrastructureServiceCreatedAt,
        updatedAt: AppHealthInfrastructureServiceUpdatedAt,
        deletedAt: AppHealthInfrastructureServiceDeletedAt,

        provider?: AppHealthInfrastructureProvider,
    )
    {
        super();
        this.id = id;
        this.providerId = providerId;
        this.name = name;
        this.score = score;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;

        // eager relationship
        this.provider = provider;
    }

    static register (
        id: AppHealthInfrastructureServiceId,
        providerId: AppHealthInfrastructureServiceProviderId,
        name: AppHealthInfrastructureServiceName,
        score: AppHealthInfrastructureServiceScore,
        createdAt: AppHealthInfrastructureServiceCreatedAt,
        updatedAt: AppHealthInfrastructureServiceUpdatedAt,
        deletedAt: AppHealthInfrastructureServiceDeletedAt,

        provider?: AppHealthInfrastructureProvider,
    ): AppHealthInfrastructureService
    {
        return new AppHealthInfrastructureService(
            id,
            providerId,
            name,
            score,
            createdAt,
            updatedAt,
            deletedAt,

            provider,
        );
    }

    created(infrastructureService: AppHealthInfrastructureService): void
    {
        this.apply(
            new AppHealthCreatedInfrastructureServiceEvent(
                infrastructureService.id.value,
                infrastructureService.providerId.value,
                infrastructureService.name.value,
                infrastructureService.score.value,
                infrastructureService.createdAt?.value,
                infrastructureService.updatedAt?.value,
                infrastructureService.deletedAt?.value,
            ),
        );
    }

    updated(infrastructureService: AppHealthInfrastructureService): void
    {
        this.apply(
            new AppHealthUpdatedInfrastructureServiceEvent(
                infrastructureService.id?.value,
                infrastructureService.providerId?.value,
                infrastructureService.name?.value,
                infrastructureService.score?.value,
                infrastructureService.createdAt?.value,
                infrastructureService.updatedAt?.value,
                infrastructureService.deletedAt?.value,
            ),
        );
    }

    deleted(infrastructureService: AppHealthInfrastructureService): void
    {
        this.apply(
            new AppHealthDeletedInfrastructureServiceEvent(
                infrastructureService.id.value,
                infrastructureService.providerId.value,
                infrastructureService.name.value,
                infrastructureService.score.value,
                infrastructureService.createdAt?.value,
                infrastructureService.updatedAt?.value,
                infrastructureService.deletedAt?.value,
            ),
        );
    }

    toDTO(): LiteralObject
    {
        return {
            id: this.id.value,
            providerId: this.providerId.value,
            name: this.name.value,
            score: this.score.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
            provider: this.provider?.toDTO(),
        };
    }

    // function called to get data for repository side effect methods
    toRepository(): LiteralObject
    {
        return {
            id: this.id.value,
            providerId: this.providerId.value,
            name: this.name.value,
            score: this.score.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
            provider: this.provider?.toDTO(),
        };
    }
}
