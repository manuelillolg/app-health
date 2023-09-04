import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import {
    AppHealthDatabaseId,
    AppHealthDatabaseName,
    AppHealthDatabaseType,
    AppHealthDatabaseVersions,
    AppHealthDatabaseCreatedAt,
    AppHealthDatabaseUpdatedAt,
    AppHealthDatabaseDeletedAt,
} from '../../domain/value-objects';
import { AppHealthIDatabaseRepository } from '../../domain/app-health-database.repository';
import { AppHealthDatabase } from '../../domain/app-health-database.aggregate';
import { AppHealthAddDatabasesContextEvent } from '../events/app-health-add-databases-context.event';

@Injectable()
export class AppHealthUpdateDatabasesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIDatabaseRepository,
    ) {}

    async main(
        payload: {
            id?: AppHealthDatabaseId;
            name?: AppHealthDatabaseName;
            type?: AppHealthDatabaseType;
            versions?: AppHealthDatabaseVersions;
        },
        queryStatement?: QueryStatement,
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


        // update
        await this.repository.update(
            database,
            {
                queryStatement,
                constraint,
                cQMetadata,
                updateOptions: cQMetadata?.repositoryOptions,
            },
        );

        // get objects to delete
        const databases = await this.repository.get(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const databasesRegister = this.publisher.mergeObjectContext(
            new AppHealthAddDatabasesContextEvent(databases),
        );

        databasesRegister.updated(); // apply event to model events
        databasesRegister.commit(); // commit all events of model
    }
}
