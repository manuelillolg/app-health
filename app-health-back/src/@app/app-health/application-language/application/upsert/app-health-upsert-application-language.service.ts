import { AppHealthApplicationLanguage, AppHealthIApplicationLanguageRepository } from '@app/app-health/application-language';
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
import { CQMetadata, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AppHealthUpsertApplicationLanguageService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIApplicationLanguageRepository,
    ) {}

    async main(
        payload: {
            id: AppHealthApplicationLanguageId;
            applicationId: AppHealthApplicationLanguageApplicationId;
            languageId: AppHealthApplicationLanguageLanguageId;
            version: AppHealthApplicationLanguageVersion;
            score: AppHealthApplicationLanguageScore;
            codeQualityScore: AppHealthApplicationLanguageCodeQualityScore;
        },
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // upsert aggregate with factory pattern
        const applicationLanguage = AppHealthApplicationLanguage.register(
            payload.id,
            payload.applicationId,
            payload.languageId,
            payload.version,
            payload.score,
            payload.codeQualityScore,
            new AppHealthApplicationLanguageCreatedAt({ currentTimestamp: true }),
            new AppHealthApplicationLanguageUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        await this.repository
            .upsert(
                applicationLanguage,
                {
                    upsertOptions: cQMetadata?.repositoryOptions,
                },
            );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const applicationLanguageRegister = this.publisher.mergeObjectContext(
            applicationLanguage,
        );

        applicationLanguageRegister.created(applicationLanguage); // apply event to model events
        applicationLanguageRegister.commit(); // commit all events of model
    }
}
