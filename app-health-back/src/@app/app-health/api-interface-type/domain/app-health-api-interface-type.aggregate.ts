/* eslint-disable key-spacing */
import { AggregateRoot } from '@nestjs/cqrs';
import { LiteralObject, Utils } from '@aurorajs.dev/core';
import {
    AppHealthApiInterfaceTypeId,
    AppHealthApiInterfaceTypeName,
    AppHealthApiInterfaceTypeScore,
    AppHealthApiInterfaceTypeCreatedAt,
    AppHealthApiInterfaceTypeUpdatedAt,
    AppHealthApiInterfaceTypeDeletedAt,
} from './value-objects';
import { AppHealthCreatedApiInterfaceTypeEvent } from '../application/events/app-health-created-api-interface-type.event';
import { AppHealthUpdatedApiInterfaceTypeEvent } from '../application/events/app-health-updated-api-interface-type.event';
import { AppHealthDeletedApiInterfaceTypeEvent } from '../application/events/app-health-deleted-api-interface-type.event';

export class AppHealthApiInterfaceType extends AggregateRoot
{
    id: AppHealthApiInterfaceTypeId;
    name: AppHealthApiInterfaceTypeName;
    score: AppHealthApiInterfaceTypeScore;
    createdAt: AppHealthApiInterfaceTypeCreatedAt;
    updatedAt: AppHealthApiInterfaceTypeUpdatedAt;
    deletedAt: AppHealthApiInterfaceTypeDeletedAt;

    // eager relationship

    constructor(
        id: AppHealthApiInterfaceTypeId,
        name: AppHealthApiInterfaceTypeName,
        score: AppHealthApiInterfaceTypeScore,
        createdAt: AppHealthApiInterfaceTypeCreatedAt,
        updatedAt: AppHealthApiInterfaceTypeUpdatedAt,
        deletedAt: AppHealthApiInterfaceTypeDeletedAt,

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
        id: AppHealthApiInterfaceTypeId,
        name: AppHealthApiInterfaceTypeName,
        score: AppHealthApiInterfaceTypeScore,
        createdAt: AppHealthApiInterfaceTypeCreatedAt,
        updatedAt: AppHealthApiInterfaceTypeUpdatedAt,
        deletedAt: AppHealthApiInterfaceTypeDeletedAt,

    ): AppHealthApiInterfaceType
    {
        return new AppHealthApiInterfaceType(
            id,
            name,
            score,
            createdAt,
            updatedAt,
            deletedAt,

        );
    }

    created(apiInterfaceType: AppHealthApiInterfaceType): void
    {
        this.apply(
            new AppHealthCreatedApiInterfaceTypeEvent(
                apiInterfaceType.id.value,
                apiInterfaceType.name.value,
                apiInterfaceType.score.value,
                apiInterfaceType.createdAt?.value,
                apiInterfaceType.updatedAt?.value,
                apiInterfaceType.deletedAt?.value,
            ),
        );
    }

    updated(apiInterfaceType: AppHealthApiInterfaceType): void
    {
        this.apply(
            new AppHealthUpdatedApiInterfaceTypeEvent(
                apiInterfaceType.id?.value,
                apiInterfaceType.name?.value,
                apiInterfaceType.score?.value,
                apiInterfaceType.createdAt?.value,
                apiInterfaceType.updatedAt?.value,
                apiInterfaceType.deletedAt?.value,
            ),
        );
    }

    deleted(apiInterfaceType: AppHealthApiInterfaceType): void
    {
        this.apply(
            new AppHealthDeletedApiInterfaceTypeEvent(
                apiInterfaceType.id.value,
                apiInterfaceType.name.value,
                apiInterfaceType.score.value,
                apiInterfaceType.createdAt?.value,
                apiInterfaceType.updatedAt?.value,
                apiInterfaceType.deletedAt?.value,
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
