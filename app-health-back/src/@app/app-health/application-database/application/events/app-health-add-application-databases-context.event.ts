import { AggregateRoot } from '@nestjs/cqrs';
import { AppHealthApplicationDatabase } from '../../domain/app-health-application-database.aggregate';
import { AppHealthCreatedApplicationDatabaseEvent } from './app-health-created-application-database.event';
import { AppHealthCreatedApplicationDatabasesEvent } from './app-health-created-application-databases.event';
import { AppHealthUpdatedApplicationDatabaseEvent } from './app-health-updated-application-database.event';
import { AppHealthUpdatedApplicationDatabasesEvent } from './app-health-updated-application-databases.event';
import { AppHealthDeletedApplicationDatabaseEvent } from './app-health-deleted-application-database.event';
import { AppHealthDeletedApplicationDatabasesEvent } from './app-health-deleted-application-databases.event';

export class AppHealthAddApplicationDatabasesContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: AppHealthApplicationDatabase[] = [],
    )
    {
        super();
    }

    *[Symbol.iterator]()
    {
        for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
    }

    created(): void
    {
        this.apply(
            new AppHealthCreatedApplicationDatabasesEvent(
                this.aggregateRoots.map(applicationDatabase =>
                    new AppHealthCreatedApplicationDatabaseEvent(
                        applicationDatabase.id.value,
                        applicationDatabase.applicationId.value,
                        applicationDatabase.databaseId.value,
                        applicationDatabase.version.value,
                        applicationDatabase.size?.value,
                        applicationDatabase.score.value,
                        applicationDatabase.totalCollectionsTables?.value,
                        applicationDatabase.totalFields?.value,
                        applicationDatabase.applicationInfrastructureServiceId.value,
                        applicationDatabase.createdAt?.value,
                        applicationDatabase.updatedAt?.value,
                        applicationDatabase.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    updated(): void
    {
        this.apply(
            new AppHealthUpdatedApplicationDatabasesEvent(
                this.aggregateRoots.map(applicationDatabase =>
                    new AppHealthUpdatedApplicationDatabaseEvent(
                        applicationDatabase.id.value,
                        applicationDatabase.applicationId.value,
                        applicationDatabase.databaseId.value,
                        applicationDatabase.version.value,
                        applicationDatabase.size?.value,
                        applicationDatabase.score.value,
                        applicationDatabase.totalCollectionsTables?.value,
                        applicationDatabase.totalFields?.value,
                        applicationDatabase.applicationInfrastructureServiceId.value,
                        applicationDatabase.createdAt?.value,
                        applicationDatabase.updatedAt?.value,
                        applicationDatabase.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    deleted(): void
    {
        this.apply(
            new AppHealthDeletedApplicationDatabasesEvent(
                this.aggregateRoots.map(applicationDatabase =>
                    new AppHealthDeletedApplicationDatabaseEvent(
                        applicationDatabase.id.value,
                        applicationDatabase.applicationId.value,
                        applicationDatabase.databaseId.value,
                        applicationDatabase.version.value,
                        applicationDatabase.size?.value,
                        applicationDatabase.score.value,
                        applicationDatabase.totalCollectionsTables?.value,
                        applicationDatabase.totalFields?.value,
                        applicationDatabase.applicationInfrastructureServiceId.value,
                        applicationDatabase.createdAt?.value,
                        applicationDatabase.updatedAt?.value,
                        applicationDatabase.deletedAt?.value,
                    ),
                ),
            ),
        );
    }
}
