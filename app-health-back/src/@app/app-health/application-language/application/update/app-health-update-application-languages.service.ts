import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
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
} from '../../domain/value-objects';
import { AppHealthIApplicationLanguageRepository } from '../../domain/app-health-application-language.repository';
import { AppHealthApplicationLanguage } from '../../domain/app-health-application-language.aggregate';
import { AppHealthAddApplicationLanguagesContextEvent } from '../events/app-health-add-application-languages-context.event';

@Injectable()
export class AppHealthUpdateApplicationLanguagesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIApplicationLanguageRepository,
    ) {}

    async main(
        payload: {
            id?: AppHealthApplicationLanguageId;
            applicationId?: AppHealthApplicationLanguageApplicationId;
            languageId?: AppHealthApplicationLanguageLanguageId;
            version?: AppHealthApplicationLanguageVersion;
            score?: AppHealthApplicationLanguageScore;
            codeQualityScore?: AppHealthApplicationLanguageCodeQualityScore;
        },
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const applicationLanguage = AppHealthApplicationLanguage.register(
            payload.id,
            payload.applicationId,
            payload.languageId,
            payload.version,
            payload.score,
            payload.codeQualityScore,
            null, // createdAt
            new AppHealthApplicationLanguageUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );


        // update
        await this.repository.update(
            applicationLanguage,
            {
                queryStatement,
                constraint,
                cQMetadata,
                updateOptions: cQMetadata?.repositoryOptions,
            },
        );

        // get objects to delete
        const applicationLanguages = await this.repository.get(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const applicationLanguagesRegister = this.publisher.mergeObjectContext(
            new AppHealthAddApplicationLanguagesContextEvent(applicationLanguages),
        );

        applicationLanguagesRegister.updated(); // apply event to model events
        applicationLanguagesRegister.commit(); // commit all events of model
    }
}
