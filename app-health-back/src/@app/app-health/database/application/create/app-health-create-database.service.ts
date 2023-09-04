import { AppHealthDatabase, AppHealthIDatabaseRepository } from '@app/app-health/database';
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
export class AppHealthCreateDatabaseService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIDatabaseRepository,
    ) {}

    async main(
        payload: {
            id: AppHealthDatabaseId;
            name: AppHealthDatabaseName;
            type: AppHealthDatabaseType;
            versions: AppHealthDatabaseVersions;
        },
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const database = AppHealthDatabase.register(
            payload.id,
            payload.name,
            payload.type,
            payload.versions,
            new AppHealthDatabaseCreatedAt({ currentTimestamp: true }),
            new AppHealthDatabaseUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        await this.repository.create(
            database,
            {
                createOptions: cQMetadata?.repositoryOptions,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const databaseRegister = this.publisher.mergeObjectContext(
            database,
        );

        databaseRegister.created(database); // apply event to model events
        databaseRegister.commit(); // commit all events of model
    }
}
