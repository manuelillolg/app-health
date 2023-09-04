import { AppHealthAddApplicationDatabasesContextEvent, AppHealthApplicationDatabase, AppHealthIApplicationDatabaseRepository } from '@app/app-health/application-database';
import {
    AppHealthApplicationDatabaseApplicationId,
    AppHealthApplicationDatabaseApplicationInfrastructureServiceId,
    AppHealthApplicationDatabaseCreatedAt,
    AppHealthApplicationDatabaseDatabaseId,
    AppHealthApplicationDatabaseDeletedAt,
    AppHealthApplicationDatabaseId,
    AppHealthApplicationDatabaseScore,
    AppHealthApplicationDatabaseSize,
    AppHealthApplicationDatabaseTotalCollectionsTables,
    AppHealthApplicationDatabaseTotalFields,
    AppHealthApplicationDatabaseUpdatedAt,
    AppHealthApplicationDatabaseVersion,
} from '@app/app-health/application-database/domain/value-objects';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AppHealthCreateApplicationDatabasesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIApplicationDatabaseRepository,
    ) {}

    async main(
        applicationDatabases: {
            id: AppHealthApplicationDatabaseId;
            applicationId: AppHealthApplicationDatabaseApplicationId;
            databaseId: AppHealthApplicationDatabaseDatabaseId;
            version: AppHealthApplicationDatabaseVersion;
            size: AppHealthApplicationDatabaseSize;
            score: AppHealthApplicationDatabaseScore;
            totalCollectionsTables: AppHealthApplicationDatabaseTotalCollectionsTables;
            totalFields: AppHealthApplicationDatabaseTotalFields;
            applicationInfrastructureServiceId: AppHealthApplicationDatabaseApplicationInfrastructureServiceId;
        } [],
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateApplicationDatabases = applicationDatabases.map(applicationDatabase => AppHealthApplicationDatabase.register(
            applicationDatabase.id,
            applicationDatabase.applicationId,
            applicationDatabase.databaseId,
            applicationDatabase.version,
            applicationDatabase.size,
            applicationDatabase.score,
            applicationDatabase.totalCollectionsTables,
            applicationDatabase.totalFields,
            applicationDatabase.applicationInfrastructureServiceId,
            new AppHealthApplicationDatabaseCreatedAt({ currentTimestamp: true }),
            new AppHealthApplicationDatabaseUpdatedAt({ currentTimestamp: true }),
            null, // deleteAt
        ));

        // insert
        await this.repository.insert(
            aggregateApplicationDatabases,
            {
                insertOptions: cQMetadata?.repositoryOptions,
            },
        );

        // create AddApplicationDatabasesContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const applicationDatabasesRegistered = this.publisher.mergeObjectContext(new AppHealthAddApplicationDatabasesContextEvent(aggregateApplicationDatabases));

        applicationDatabasesRegistered.created(); // apply event to model events
        applicationDatabasesRegistered.commit(); // commit all events of model
    }
}
