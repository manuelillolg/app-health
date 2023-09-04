import { AppHealthAddDatabasesContextEvent, AppHealthDatabase, AppHealthIDatabaseRepository } from '@app/app-health/database';
import {
    AppHealthDatabaseCreatedAt,
    AppHealthDatabaseDeletedAt,
    AppHealthDatabaseId,
    AppHealthDatabaseName,
    AppHealthDatabaseType,
    AppHealthDatabaseUpdatedAt,
    AppHealthDatabaseVersions,
} from '@app/app-health/database/domain/value-objects';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AppHealthCreateDatabasesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIDatabaseRepository,
    ) {}

    async main(
        databases: {
            id: AppHealthDatabaseId;
            name: AppHealthDatabaseName;
            type: AppHealthDatabaseType;
            versions: AppHealthDatabaseVersions;
        } [],
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateDatabases = databases.map(database => AppHealthDatabase.register(
            database.id,
            database.name,
            database.type,
            database.versions,
            new AppHealthDatabaseCreatedAt({ currentTimestamp: true }),
            new AppHealthDatabaseUpdatedAt({ currentTimestamp: true }),
            null, // deleteAt
        ));

        // insert
        await this.repository.insert(
            aggregateDatabases,
            {
                insertOptions: cQMetadata?.repositoryOptions,
            },
        );

        // create AddDatabasesContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const databasesRegistered = this.publisher.mergeObjectContext(new AppHealthAddDatabasesContextEvent(aggregateDatabases));

        databasesRegistered.created(); // apply event to model events
        databasesRegistered.commit(); // commit all events of model
    }
}
