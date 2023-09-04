import { AppHealthAddDatabasesContextEvent, AppHealthIDatabaseRepository } from '@app/app-health/database';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AppHealthDeleteDatabasesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIDatabaseRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get objects to delete
        const databases = await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });

        if (databases.length === 0) return;

        await this.repository.delete({
            queryStatement,
            constraint,
            cQMetadata,
            deleteOptions: cQMetadata?.repositoryOptions,
        });

        // create AddDatabasesContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const databasesRegistered = this.publisher.mergeObjectContext(
            new AppHealthAddDatabasesContextEvent(databases),
        );

        databasesRegistered.deleted(); // apply event to model events
        databasesRegistered.commit(); // commit all events of model
    }
}
