/* eslint-disable key-spacing */
import { AggregateRoot } from '@nestjs/cqrs';
import { LiteralObject, Utils } from '@aurorajs.dev/core';
import {
    AppHealthApplicationLanguageId,
    AppHealthApplicationLanguageApplicationId,
    AppHealthApplicationLanguageLanguageId,
    AppHealthApplicationLanguageVersion,
    AppHealthApplicationLanguageScore,
    AppHealthApplicationLanguageCodeQualityScore,
    AppHealthApplicationLanguageCreatedAt,
    AppHealthApplicationLanguageUpdatedAt,
    AppHealthApplicationLanguageDeletedAt,
} from './value-objects';
import { AppHealthCreatedApplicationLanguageEvent } from '../application/events/app-health-created-application-language.event';
import { AppHealthUpdatedApplicationLanguageEvent } from '../application/events/app-health-updated-application-language.event';
import { AppHealthDeletedApplicationLanguageEvent } from '../application/events/app-health-deleted-application-language.event';
import { AppHealthApplication } from '@app/app-health/application';
import { AppHealthLanguage } from '@app/app-health/language';

export class AppHealthApplicationLanguage extends AggregateRoot
{
    id: AppHealthApplicationLanguageId;
    applicationId: AppHealthApplicationLanguageApplicationId;
    languageId: AppHealthApplicationLanguageLanguageId;
    version: AppHealthApplicationLanguageVersion;
    score: AppHealthApplicationLanguageScore;
    codeQualityScore: AppHealthApplicationLanguageCodeQualityScore;
    createdAt: AppHealthApplicationLanguageCreatedAt;
    updatedAt: AppHealthApplicationLanguageUpdatedAt;
    deletedAt: AppHealthApplicationLanguageDeletedAt;

    // eager relationship
    application: AppHealthApplication;
    language: AppHealthLanguage;

    constructor(
        id: AppHealthApplicationLanguageId,
        applicationId: AppHealthApplicationLanguageApplicationId,
        languageId: AppHealthApplicationLanguageLanguageId,
        version: AppHealthApplicationLanguageVersion,
        score: AppHealthApplicationLanguageScore,
        codeQualityScore: AppHealthApplicationLanguageCodeQualityScore,
        createdAt: AppHealthApplicationLanguageCreatedAt,
        updatedAt: AppHealthApplicationLanguageUpdatedAt,
        deletedAt: AppHealthApplicationLanguageDeletedAt,

        application?: AppHealthApplication,
        language?: AppHealthLanguage,
    )
    {
        super();
        this.id = id;
        this.applicationId = applicationId;
        this.languageId = languageId;
        this.version = version;
        this.score = score;
        this.codeQualityScore = codeQualityScore;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;

        // eager relationship
        this.application = application;
        this.language = language;
    }

    static register (
        id: AppHealthApplicationLanguageId,
        applicationId: AppHealthApplicationLanguageApplicationId,
        languageId: AppHealthApplicationLanguageLanguageId,
        version: AppHealthApplicationLanguageVersion,
        score: AppHealthApplicationLanguageScore,
        codeQualityScore: AppHealthApplicationLanguageCodeQualityScore,
        createdAt: AppHealthApplicationLanguageCreatedAt,
        updatedAt: AppHealthApplicationLanguageUpdatedAt,
        deletedAt: AppHealthApplicationLanguageDeletedAt,

        application?: AppHealthApplication,
        language?: AppHealthLanguage,
    ): AppHealthApplicationLanguage
    {
        return new AppHealthApplicationLanguage(
            id,
            applicationId,
            languageId,
            version,
            score,
            codeQualityScore,
            createdAt,
            updatedAt,
            deletedAt,

            application,
            language,
        );
    }

    created(applicationLanguage: AppHealthApplicationLanguage): void
    {
        this.apply(
            new AppHealthCreatedApplicationLanguageEvent(
                applicationLanguage.id.value,
                applicationLanguage.applicationId.value,
                applicationLanguage.languageId.value,
                applicationLanguage.version.value,
                applicationLanguage.score.value,
                applicationLanguage.codeQualityScore.value,
                applicationLanguage.createdAt?.value,
                applicationLanguage.updatedAt?.value,
                applicationLanguage.deletedAt?.value,
            ),
        );
    }

    updated(applicationLanguage: AppHealthApplicationLanguage): void
    {
        this.apply(
            new AppHealthUpdatedApplicationLanguageEvent(
                applicationLanguage.id?.value,
                applicationLanguage.applicationId?.value,
                applicationLanguage.languageId?.value,
                applicationLanguage.version?.value,
                applicationLanguage.score?.value,
                applicationLanguage.codeQualityScore?.value,
                applicationLanguage.createdAt?.value,
                applicationLanguage.updatedAt?.value,
                applicationLanguage.deletedAt?.value,
            ),
        );
    }

    deleted(applicationLanguage: AppHealthApplicationLanguage): void
    {
        this.apply(
            new AppHealthDeletedApplicationLanguageEvent(
                applicationLanguage.id.value,
                applicationLanguage.applicationId.value,
                applicationLanguage.languageId.value,
                applicationLanguage.version.value,
                applicationLanguage.score.value,
                applicationLanguage.codeQualityScore.value,
                applicationLanguage.createdAt?.value,
                applicationLanguage.updatedAt?.value,
                applicationLanguage.deletedAt?.value,
            ),
        );
    }

    toDTO(): LiteralObject
    {
        return {
            id: this.id.value,
            applicationId: this.applicationId.value,
            languageId: this.languageId.value,
            version: this.version.value,
            score: this.score.value,
            codeQualityScore: this.codeQualityScore.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
            application: this.application?.toDTO(),
            language: this.language?.toDTO(),
        };
    }

    // function called to get data for repository side effect methods
    toRepository(): LiteralObject
    {
        return {
            id: this.id.value,
            applicationId: this.applicationId.value,
            languageId: this.languageId.value,
            version: this.version.value,
            score: this.score.value,
            codeQualityScore: this.codeQualityScore.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
            application: this.application?.toDTO(),
            language: this.language?.toDTO(),
        };
    }
}
