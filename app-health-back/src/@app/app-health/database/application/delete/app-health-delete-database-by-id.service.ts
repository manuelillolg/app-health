import { AppHealthIDatabaseRepository } from '@app/app-health/database';
import { AppHealthDatabaseId } from '@app/app-health/database/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AppHealthDeleteDatabaseByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIDatabaseRepository,
    ) {}

    async main(
        id: AppHealthDatabaseId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get object to delete
        const database = await this.repository
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
                database.id,
                {
                    deleteOptions: cQMetadata?.repositoryOptions,
                    cQMetadata,
                },
            );

        // insert EventBus in object, to be able to apply and commit events
        const databaseRegister = this.publisher.mergeObjectContext(database);

        databaseRegister.deleted(database); // apply event to model events
        databaseRegister.commit(); // commit all events of model
    }
}
