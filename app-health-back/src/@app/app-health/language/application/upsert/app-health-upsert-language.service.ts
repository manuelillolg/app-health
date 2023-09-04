import { AppHealthILanguageRepository, AppHealthLanguage } from '@app/app-health/language';
import {
    AppHealthLanguageCreatedAt,
    AppHealthLanguageDeletedAt,
    AppHealthLanguageId,
    AppHealthLanguageName,
    AppHealthLanguageUpdatedAt,
    AppHealthLanguageVersions,
} from '@app/app-health/language/domain/value-objects';
import { CQMetadata, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AppHealthUpsertLanguageService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthILanguageRepository,
    ) {}

    async main(
        payload: {
            id: AppHealthLanguageId;
            name: AppHealthLanguageName;
            versions: AppHealthLanguageVersions;
        },
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // upsert aggregate with factory pattern
        const language = AppHealthLanguage.register(
            payload.id,
            payload.name,
            payload.versions,
            new AppHealthLanguageCreatedAt({ currentTimestamp: true }),
            new AppHealthLanguageUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        await this.repository
            .upsert(
                language,
                {
                    upsertOptions: cQMetadata?.repositoryOptions,
                },
            );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const languageRegister = this.publisher.mergeObjectContext(
            language,
        );

        languageRegister.created(language); // apply event to model events
        languageRegister.commit(); // commit all events of model
    }
}
