import { AppHealthIApplicationDatabaseRepository } from '@app/app-health/application-database';
import { AppHealthApplicationDatabaseId } from '@app/app-health/application-database/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AppHealthDeleteApplicationDatabaseByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIApplicationDatabaseRepository,
    ) {}

    async main(
        id: AppHealthApplicationDatabaseId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get object to delete
        const applicationDatabase = await this.repository
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
                applicationDatabase.id,
                {
                    deleteOptions: cQMetadata?.repositoryOptions,
                    cQMetadata,
                },
            );

        // insert EventBus in object, to be able to apply and commit events
        const applicationDatabaseRegister = this.publisher.mergeObjectContext(applicationDatabase);

        applicationDatabaseRegister.deleted(applicationDatabase); // apply event to model events
        applicationDatabaseRegister.commit(); // commit all events of model
    }
}
