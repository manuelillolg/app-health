/* eslint-disable key-spacing */
import { AggregateRoot } from '@nestjs/cqrs';
import { LiteralObject, Utils } from '@aurorajs.dev/core';
import {
    AppHealthDatabaseId,
    AppHealthDatabaseName,
    AppHealthDatabaseType,
    AppHealthDatabaseVersions,
    AppHealthDatabaseCreatedAt,
    AppHealthDatabaseUpdatedAt,
    AppHealthDatabaseDeletedAt,
} from './value-objects';
import { AppHealthCreatedDatabaseEvent } from '../application/events/app-health-created-database.event';
import { AppHealthUpdatedDatabaseEvent } from '../application/events/app-health-updated-database.event';
import { AppHealthDeletedDatabaseEvent } from '../application/events/app-health-deleted-database.event';

export class AppHealthDatabase extends AggregateRoot
{
    id: AppHealthDatabaseId;
    name: AppHealthDatabaseName;
    type: AppHealthDatabaseType;
    versions: AppHealthDatabaseVersions;
    createdAt: AppHealthDatabaseCreatedAt;
    updatedAt: AppHealthDatabaseUpdatedAt;
    deletedAt: AppHealthDatabaseDeletedAt;

    // eager relationship

    constructor(
        id: AppHealthDatabaseId,
        name: AppHealthDatabaseName,
        type: AppHealthDatabaseType,
        versions: AppHealthDatabaseVersions,
        createdAt: AppHealthDatabaseCreatedAt,
        updatedAt: AppHealthDatabaseUpdatedAt,
        deletedAt: AppHealthDatabaseDeletedAt,

    )
    {
        super();
        this.id = id;
        this.name = name;
        this.type = type;
        this.versions = versions;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;

        // eager relationship
    }

    static register (
        id: AppHealthDatabaseId,
        name: AppHealthDatabaseName,
        type: AppHealthDatabaseType,
        versions: AppHealthDatabaseVersions,
        createdAt: AppHealthDatabaseCreatedAt,
        updatedAt: AppHealthDatabaseUpdatedAt,
        deletedAt: AppHealthDatabaseDeletedAt,

    ): AppHealthDatabase
    {
        return new AppHealthDatabase(
            id,
            name,
            type,
            versions,
            createdAt,
            updatedAt,
            deletedAt,

        );
    }

    created(database: AppHealthDatabase): void
    {
        this.apply(
            new AppHealthCreatedDatabaseEvent(
                database.id.value,
                database.name.value,
                database.type.value,
                database.versions.value,
                database.createdAt?.value,
                database.updatedAt?.value,
                database.deletedAt?.value,
            ),
        );
    }

    updated(database: AppHealthDatabase): void
    {
        this.apply(
            new AppHealthUpdatedDatabaseEvent(
                database.id?.value,
                database.name?.value,
                database.type?.value,
                database.versions?.value,
                database.createdAt?.value,
                database.updatedAt?.value,
                database.deletedAt?.value,
            ),
        );
    }

    deleted(database: AppHealthDatabase): void
    {
        this.apply(
            new AppHealthDeletedDatabaseEvent(
                database.id.value,
                database.name.value,
                database.type.value,
                database.versions.value,
                database.createdAt?.value,
                database.updatedAt?.value,
                database.deletedAt?.value,
            ),
        );
    }

    toDTO(): LiteralObject
    {
        return {
            id: this.id.value,
            name: this.name.value,
            type: this.type.value,
            versions: this.versions.value,
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
            type: this.type.value,
            versions: this.versions.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
        };
    }
}
