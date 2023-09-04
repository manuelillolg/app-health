import { AppHealthILanguageRepository, AppHealthLanguage } from '@app/app-health/language';
import {
    AppHealthLanguageCreatedAt,
    AppHealthLanguageDeletedAt,
    AppHealthLanguageId,
    AppHealthLanguageName,
    AppHealthLanguageUpdatedAt,
    AppHealthLanguageVersions,
} from '@app/app-health/language/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AppHealthUpdateLanguageByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthILanguageRepository,
    ) {}

    async main(
        payload: {
            id: AppHealthLanguageId;
            name?: AppHealthLanguageName;
            versions?: AppHealthLanguageVersions;
        },
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const language = AppHealthLanguage.register(
            payload.id,
            payload.name,
            payload.versions,
            null, // createdAt
            new AppHealthLanguageUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        // update by id
        await this.repository.updateById(
            language,
            {
                constraint,
                cQMetadata,
                updateByIdOptions: cQMetadata?.repositoryOptions,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const languageRegister = this.publisher.mergeObjectContext(
            language,
        );

        languageRegister.updated(language); // apply event to model events
        languageRegister.commit(); // commit all events of model
    }
}
