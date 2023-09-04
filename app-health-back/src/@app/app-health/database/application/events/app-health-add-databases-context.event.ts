import { AggregateRoot } from '@nestjs/cqrs';
import { AppHealthDatabase } from '../../domain/app-health-database.aggregate';
import { AppHealthCreatedDatabaseEvent } from './app-health-created-database.event';
import { AppHealthCreatedDatabasesEvent } from './app-health-created-databases.event';
import { AppHealthUpdatedDatabaseEvent } from './app-health-updated-database.event';
import { AppHealthUpdatedDatabasesEvent } from './app-health-updated-databases.event';
import { AppHealthDeletedDatabaseEvent } from './app-health-deleted-database.event';
import { AppHealthDeletedDatabasesEvent } from './app-health-deleted-databases.event';

export class AppHealthAddDatabasesContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: AppHealthDatabase[] = [],
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
            new AppHealthCreatedDatabasesEvent(
                this.aggregateRoots.map(database =>
                    new AppHealthCreatedDatabaseEvent(
                        database.id.value,
                        database.name.value,
                        database.type.value,
                        database.versions.value,
                        database.createdAt?.value,
                        database.updatedAt?.value,
                        database.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    updated(): void
    {
        this.apply(
            new AppHealthUpdatedDatabasesEvent(
                this.aggregateRoots.map(database =>
                    new AppHealthUpdatedDatabaseEvent(
                        database.id.value,
                        database.name.value,
                        database.type.value,
                        database.versions.value,
                        database.createdAt?.value,
                        database.updatedAt?.value,
                        database.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    deleted(): void
    {
        this.apply(
            new AppHealthDeletedDatabasesEvent(
                this.aggregateRoots.map(database =>
                    new AppHealthDeletedDatabaseEvent(
                        database.id.value,
                        database.name.value,
                        database.type.value,
                        database.versions.value,
                        database.createdAt?.value,
                        database.updatedAt?.value,
                        database.deletedAt?.value,
                    ),
                ),
            ),
        );
    }
}
