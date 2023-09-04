import { AppHealthIApplicationLanguageRepository } from '@app/app-health/application-language';
import { AppHealthApplicationLanguageId } from '@app/app-health/application-language/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AppHealthDeleteApplicationLanguageByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIApplicationLanguageRepository,
    ) {}

    async main(
        id: AppHealthApplicationLanguageId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get object to delete
        const applicationLanguage = await this.repository
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
                applicationLanguage.id,
                {
                    deleteOptions: cQMetadata?.repositoryOptions,
                    cQMetadata,
                },
            );

        // insert EventBus in object, to be able to apply and commit events
        const applicationLanguageRegister = this.publisher.mergeObjectContext(applicationLanguage);

        applicationLanguageRegister.deleted(applicationLanguage); // apply event to model events
        applicationLanguageRegister.commit(); // commit all events of model
    }
}
