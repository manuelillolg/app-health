import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import {
    AppHealthApplicationDatabaseId,
    AppHealthApplicationDatabaseApplicationId,
    AppHealthApplicationDatabaseDatabaseId,
    AppHealthApplicationDatabaseVersion,
    AppHealthApplicationDatabaseSize,
    AppHealthApplicationDatabaseScore,
    AppHealthApplicationDatabaseTotalCollectionsTables,
    AppHealthApplicationDatabaseTotalFields,
    AppHealthApplicationDatabaseApplicationInfrastructureServiceId,
    AppHealthApplicationDatabaseCreatedAt,
    AppHealthApplicationDatabaseUpdatedAt,
    AppHealthApplicationDatabaseDeletedAt,
} from '../../domain/value-objects';
import { AppHealthIApplicationDatabaseRepository } from '../../domain/app-health-application-database.repository';
import { AppHealthApplicationDatabase } from '../../domain/app-health-application-database.aggregate';
import { AppHealthAddApplicationDatabasesContextEvent } from '../events/app-health-add-application-databases-context.event';

@Injectable()
export class AppHealthUpdateApplicationDatabasesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIApplicationDatabaseRepository,
    ) {}

    async main(
        payload: {
            id?: AppHealthApplicationDatabaseId;
            applicationId?: AppHealthApplicationDatabaseApplicationId;
            databaseId?: AppHealthApplicationDatabaseDatabaseId;
            version?: AppHealthApplicationDatabaseVersion;
            size?: AppHealthApplicationDatabaseSize;
            score?: AppHealthApplicationDatabaseScore;
            totalCollectionsTables?: AppHealthApplicationDatabaseTotalCollectionsTables;
            totalFields?: AppHealthApplicationDatabaseTotalFields;
            applicationInfrastructureServiceId?: AppHealthApplicationDatabaseApplicationInfrastructureServiceId;
        },
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const applicationDatabase = AppHealthApplicationDatabase.register(
            payload.id,
            payload.applicationId,
            payload.databaseId,
            payload.version,
            payload.size,
            payload.score,
            payload.totalCollectionsTables,
            payload.totalFields,
            payload.applicationInfrastructureServiceId,
            null, // createdAt
            new AppHealthApplicationDatabaseUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );


        // update
        await this.repository.update(
            applicationDatabase,
            {
                queryStatement,
                constraint,
                cQMetadata,
                updateOptions: cQMetadata?.repositoryOptions,
            },
        );

        // get objects to delete
        const applicationDatabases = await this.repository.get(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const applicationDatabasesRegister = this.publisher.mergeObjectContext(
            new AppHealthAddApplicationDatabasesContextEvent(applicationDatabases),
        );

        applicationDatabasesRegister.updated(); // apply event to model events
        applicationDatabasesRegister.commit(); // commit all events of model
    }
}
