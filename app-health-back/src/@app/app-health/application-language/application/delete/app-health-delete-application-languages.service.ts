import { AppHealthAddApplicationLanguagesContextEvent, AppHealthIApplicationLanguageRepository } from '@app/app-health/application-language';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AppHealthDeleteApplicationLanguagesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIApplicationLanguageRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get objects to delete
        const applicationLanguages = await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });

        if (applicationLanguages.length === 0) return;

        await this.repository.delete({
            queryStatement,
            constraint,
            cQMetadata,
            deleteOptions: cQMetadata?.repositoryOptions,
        });

        // create AddApplicationLanguagesContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const applicationLanguagesRegistered = this.publisher.mergeObjectContext(
            new AppHealthAddApplicationLanguagesContextEvent(applicationLanguages),
        );

        applicationLanguagesRegistered.deleted(); // apply event to model events
        applicationLanguagesRegistered.commit(); // commit all events of model
    }
}
