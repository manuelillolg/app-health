/* eslint-disable key-spacing */
import { AggregateRoot } from '@nestjs/cqrs';
import { LiteralObject, Utils } from '@aurorajs.dev/core';
import {
    AppHealthLanguageId,
    AppHealthLanguageName,
    AppHealthLanguageVersions,
    AppHealthLanguageCreatedAt,
    AppHealthLanguageUpdatedAt,
    AppHealthLanguageDeletedAt,
} from './value-objects';
import { AppHealthCreatedLanguageEvent } from '../application/events/app-health-created-language.event';
import { AppHealthUpdatedLanguageEvent } from '../application/events/app-health-updated-language.event';
import { AppHealthDeletedLanguageEvent } from '../application/events/app-health-deleted-language.event';

export class AppHealthLanguage extends AggregateRoot
{
    id: AppHealthLanguageId;
    name: AppHealthLanguageName;
    versions: AppHealthLanguageVersions;
    createdAt: AppHealthLanguageCreatedAt;
    updatedAt: AppHealthLanguageUpdatedAt;
    deletedAt: AppHealthLanguageDeletedAt;

    // eager relationship

    constructor(
        id: AppHealthLanguageId,
        name: AppHealthLanguageName,
        versions: AppHealthLanguageVersions,
        createdAt: AppHealthLanguageCreatedAt,
        updatedAt: AppHealthLanguageUpdatedAt,
        deletedAt: AppHealthLanguageDeletedAt,

    )
    {
        super();
        this.id = id;
        this.name = name;
        this.versions = versions;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;

        // eager relationship
    }

    static register (
        id: AppHealthLanguageId,
        name: AppHealthLanguageName,
        versions: AppHealthLanguageVersions,
        createdAt: AppHealthLanguageCreatedAt,
        updatedAt: AppHealthLanguageUpdatedAt,
        deletedAt: AppHealthLanguageDeletedAt,

    ): AppHealthLanguage
    {
        return new AppHealthLanguage(
            id,
            name,
            versions,
            createdAt,
            updatedAt,
            deletedAt,

        );
    }

    created(language: AppHealthLanguage): void
    {
        this.apply(
            new AppHealthCreatedLanguageEvent(
                language.id.value,
                language.name.value,
                language.versions.value,
                language.createdAt?.value,
                language.updatedAt?.value,
                language.deletedAt?.value,
            ),
        );
    }

    updated(language: AppHealthLanguage): void
    {
        this.apply(
            new AppHealthUpdatedLanguageEvent(
                language.id?.value,
                language.name?.value,
                language.versions?.value,
                language.createdAt?.value,
                language.updatedAt?.value,
                language.deletedAt?.value,
            ),
        );
    }

    deleted(language: AppHealthLanguage): void
    {
        this.apply(
            new AppHealthDeletedLanguageEvent(
                language.id.value,
                language.name.value,
                language.versions.value,
                language.createdAt?.value,
                language.updatedAt?.value,
                language.deletedAt?.value,
            ),
        );
    }

    toDTO(): LiteralObject
    {
        return {
            id: this.id.value,
            name: this.name.value,
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
            versions: this.versions.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
        };
    }
}
