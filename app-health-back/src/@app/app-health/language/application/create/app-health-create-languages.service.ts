import { AppHealthAddLanguagesContextEvent, AppHealthILanguageRepository, AppHealthLanguage } from '@app/app-health/language';
import {
    AppHealthLanguageCreatedAt,
    AppHealthLanguageDeletedAt,
    AppHealthLanguageId,
    AppHealthLanguageName,
    AppHealthLanguageUpdatedAt,
    AppHealthLanguageVersions,
} from '@app/app-health/language/domain/value-objects';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AppHealthCreateLanguagesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthILanguageRepository,
    ) {}

    async main(
        languages: {
            id: AppHealthLanguageId;
            name: AppHealthLanguageName;
            versions: AppHealthLanguageVersions;
        } [],
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateLanguages = languages.map(language => AppHealthLanguage.register(
            language.id,
            language.name,
            language.versions,
            new AppHealthLanguageCreatedAt({ currentTimestamp: true }),
            new AppHealthLanguageUpdatedAt({ currentTimestamp: true }),
            null, // deleteAt
        ));

        // insert
        await this.repository.insert(
            aggregateLanguages,
            {
                insertOptions: cQMetadata?.repositoryOptions,
            },
        );

        // create AddLanguagesContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const languagesRegistered = this.publisher.mergeObjectContext(new AppHealthAddLanguagesContextEvent(aggregateLanguages));

        languagesRegistered.created(); // apply event to model events
        languagesRegistered.commit(); // commit all events of model
    }
}
