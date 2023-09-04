import { AppHealthAddApplicationLanguagesContextEvent, AppHealthApplicationLanguage, AppHealthIApplicationLanguageRepository } from '@app/app-health/application-language';
import {
    AppHealthApplicationLanguageApplicationId,
    AppHealthApplicationLanguageCodeQualityScore,
    AppHealthApplicationLanguageCreatedAt,
    AppHealthApplicationLanguageDeletedAt,
    AppHealthApplicationLanguageId,
    AppHealthApplicationLanguageLanguageId,
    AppHealthApplicationLanguageScore,
    AppHealthApplicationLanguageUpdatedAt,
    AppHealthApplicationLanguageVersion,
} from '@app/app-health/application-language/domain/value-objects';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AppHealthCreateApplicationLanguagesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIApplicationLanguageRepository,
    ) {}

    async main(
        applicationLanguages: {
            id: AppHealthApplicationLanguageId;
            applicationId: AppHealthApplicationLanguageApplicationId;
            languageId: AppHealthApplicationLanguageLanguageId;
            version: AppHealthApplicationLanguageVersion;
            score: AppHealthApplicationLanguageScore;
            codeQualityScore: AppHealthApplicationLanguageCodeQualityScore;
        } [],
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateApplicationLanguages = applicationLanguages.map(applicationLanguage => AppHealthApplicationLanguage.register(
            applicationLanguage.id,
            applicationLanguage.applicationId,
            applicationLanguage.languageId,
            applicationLanguage.version,
            applicationLanguage.score,
            applicationLanguage.codeQualityScore,
            new AppHealthApplicationLanguageCreatedAt({ currentTimestamp: true }),
            new AppHealthApplicationLanguageUpdatedAt({ currentTimestamp: true }),
            null, // deleteAt
        ));

        // insert
        await this.repository.insert(
            aggregateApplicationLanguages,
            {
                insertOptions: cQMetadata?.repositoryOptions,
            },
        );

        // create AddApplicationLanguagesContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const applicationLanguagesRegistered = this.publisher.mergeObjectContext(new AppHealthAddApplicationLanguagesContextEvent(aggregateApplicationLanguages));

        applicationLanguagesRegistered.created(); // apply event to model events
        applicationLanguagesRegistered.commit(); // commit all events of model
    }
}
