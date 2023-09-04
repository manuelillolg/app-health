import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import {
    AppHealthLanguageId,
    AppHealthLanguageName,
    AppHealthLanguageVersions,
    AppHealthLanguageCreatedAt,
    AppHealthLanguageUpdatedAt,
    AppHealthLanguageDeletedAt,
} from '../../domain/value-objects';
import { AppHealthILanguageRepository } from '../../domain/app-health-language.repository';
import { AppHealthLanguage } from '../../domain/app-health-language.aggregate';
import { AppHealthAddLanguagesContextEvent } from '../events/app-health-add-languages-context.event';

@Injectable()
export class AppHealthUpdateLanguagesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthILanguageRepository,
    ) {}

    async main(
        payload: {
            id?: AppHealthLanguageId;
            name?: AppHealthLanguageName;
            versions?: AppHealthLanguageVersions;
        },
        queryStatement?: QueryStatement,
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


        // update
        await this.repository.update(
            language,
            {
                queryStatement,
                constraint,
                cQMetadata,
                updateOptions: cQMetadata?.repositoryOptions,
            },
        );

        // get objects to delete
        const languages = await this.repository.get(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const languagesRegister = this.publisher.mergeObjectContext(
            new AppHealthAddLanguagesContextEvent(languages),
        );

        languagesRegister.updated(); // apply event to model events
        languagesRegister.commit(); // commit all events of model
    }
}
