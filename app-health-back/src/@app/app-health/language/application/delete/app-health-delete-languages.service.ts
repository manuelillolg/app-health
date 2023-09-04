import { AppHealthAddLanguagesContextEvent, AppHealthILanguageRepository } from '@app/app-health/language';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AppHealthDeleteLanguagesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthILanguageRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get objects to delete
        const languages = await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });

        if (languages.length === 0) return;

        await this.repository.delete({
            queryStatement,
            constraint,
            cQMetadata,
            deleteOptions: cQMetadata?.repositoryOptions,
        });

        // create AddLanguagesContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const languagesRegistered = this.publisher.mergeObjectContext(
            new AppHealthAddLanguagesContextEvent(languages),
        );

        languagesRegistered.deleted(); // apply event to model events
        languagesRegistered.commit(); // commit all events of model
    }
}
