import { AppHealthILanguageRepository } from '@app/app-health/language';
import { AppHealthLanguageId } from '@app/app-health/language/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AppHealthDeleteLanguageByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthILanguageRepository,
    ) {}

    async main(
        id: AppHealthLanguageId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get object to delete
        const language = await this.repository
            .findById(
                id,
                {
                    constraint,
                    cQMetadata,
                },
            );

        // it is not necessary to pass the constraint in the delete, if the object
        // is not found in the findById, an exception will be thrown.
        await this.repository
            .deleteById(
                language.id,
                {
                    deleteOptions: cQMetadata?.repositoryOptions,
                    cQMetadata,
                },
            );

        // insert EventBus in object, to be able to apply and commit events
        const languageRegister = this.publisher.mergeObjectContext(language);

        languageRegister.deleted(language); // apply event to model events
        languageRegister.commit(); // commit all events of model
    }
}
