/* eslint-disable key-spacing */
import { AggregateRoot } from '@nestjs/cqrs';
import { LiteralObject, Utils } from '@aurorajs.dev/core';
import {
    AppHealthInfrastructureProviderId,
    AppHealthInfrastructureProviderName,
    AppHealthInfrastructureProviderScore,
    AppHealthInfrastructureProviderCreatedAt,
    AppHealthInfrastructureProviderUpdatedAt,
    AppHealthInfrastructureProviderDeletedAt,
} from './value-objects';
import { AppHealthCreatedInfrastructureProviderEvent } from '../application/events/app-health-created-infrastructure-provider.event';
import { AppHealthUpdatedInfrastructureProviderEvent } from '../application/events/app-health-updated-infrastructure-provider.event';
import { AppHealthDeletedInfrastructureProviderEvent } from '../application/events/app-health-deleted-infrastructure-provider.event';

export class AppHealthInfrastructureProvider extends AggregateRoot
{
    id: AppHealthInfrastructureProviderId;
    name: AppHealthInfrastructureProviderName;
    score: AppHealthInfrastructureProviderScore;
    createdAt: AppHealthInfrastructureProviderCreatedAt;
    updatedAt: AppHealthInfrastructureProviderUpdatedAt;
    deletedAt: AppHealthInfrastructureProviderDeletedAt;

    // eager relationship

    constructor(
        id: AppHealthInfrastructureProviderId,
        name: AppHealthInfrastructureProviderName,
        score: AppHealthInfrastructureProviderScore,
        createdAt: AppHealthInfrastructureProviderCreatedAt,
        updatedAt: AppHealthInfrastructureProviderUpdatedAt,
        deletedAt: AppHealthInfrastructureProviderDeletedAt,

    )
    {
        super();
        this.id = id;
        this.name = name;
        this.score = score;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;

        // eager relationship
    }

    static register (
        id: AppHealthInfrastructureProviderId,
        name: AppHealthInfrastructureProviderName,
        score: AppHealthInfrastructureProviderScore,
        createdAt: AppHealthInfrastructureProviderCreatedAt,
        updatedAt: AppHealthInfrastructureProviderUpdatedAt,
        deletedAt: AppHealthInfrastructureProviderDeletedAt,

    ): AppHealthInfrastructureProvider
    {
        return new AppHealthInfrastructureProvider(
            id,
            name,
            score,
            createdAt,
            updatedAt,
            deletedAt,

        );
    }

    created(infrastructureProvider: AppHealthInfrastructureProvider): void
    {
        this.apply(
            new AppHealthCreatedInfrastructureProviderEvent(
                infrastructureProvider.id.value,
                infrastructureProvider.name.value,
                infrastructureProvider.score.value,
                infrastructureProvider.createdAt?.value,
                infrastructureProvider.updatedAt?.value,
                infrastructureProvider.deletedAt?.value,
            ),
        );
    }

    updated(infrastructureProvider: AppHealthInfrastructureProvider): void
    {
        this.apply(
            new AppHealthUpdatedInfrastructureProviderEvent(
                infrastructureProvider.id?.value,
                infrastructureProvider.name?.value,
                infrastructureProvider.score?.value,
                infrastructureProvider.createdAt?.value,
                infrastructureProvider.updatedAt?.value,
                infrastructureProvider.deletedAt?.value,
            ),
        );
    }

    deleted(infrastructureProvider: AppHealthInfrastructureProvider): void
    {
        this.apply(
            new AppHealthDeletedInfrastructureProviderEvent(
                infrastructureProvider.id.value,
                infrastructureProvider.name.value,
                infrastructureProvider.score.value,
                infrastructureProvider.createdAt?.value,
                infrastructureProvider.updatedAt?.value,
                infrastructureProvider.deletedAt?.value,
            ),
        );
    }

    toDTO(): LiteralObject
    {
        return {
            id: this.id.value,
            name: this.name.value,
            score: this.score.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
        };
    }

    // function called to get data for repository side effect methods
    toRepository(): LiteralObject
    {
        return {
            id: this.id.value,
            name: this.name.value,
            score: this.score.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
        };
    }
}
