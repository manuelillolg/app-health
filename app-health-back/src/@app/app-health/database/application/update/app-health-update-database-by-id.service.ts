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
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AppHealthUpdateDatabaseByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIDatabaseRepository,
    ) {}

    async main(
        payload: {
            id: AppHealthDatabaseId;
            name?: AppHealthDatabaseName;
            type?: AppHealthDatabaseType;
            versions?: AppHealthDatabaseVersions;
        },
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const database = AppHealthDatabase.register(
            payload.id,
            payload.name,
            payload.type,
            payload.versions,
            null, // createdAt
            new AppHealthDatabaseUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        // update by id
        await this.repository.updateById(
            database,
            {
                constraint,
                cQMetadata,
                updateByIdOptions: cQMetadata?.repositoryOptions,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const databaseRegister = this.publisher.mergeObjectContext(
            database,
        );

        databaseRegister.updated(database); // apply event to model events
        databaseRegister.commit(); // commit all events of model
    }
}
