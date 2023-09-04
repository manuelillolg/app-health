import { Injectable } from '@nestjs/common';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { AppHealthIDatabaseRepository } from '@app/app-health/database/domain/app-health-database.repository';
import {
    AppHealthDatabaseId,
    AppHealthDatabaseName,
    AppHealthDatabaseType,
    AppHealthDatabaseVersions,
    AppHealthDatabaseCreatedAt,
    AppHealthDatabaseUpdatedAt,
    AppHealthDatabaseDeletedAt,
} from '@app/app-health/database/domain/value-objects';
import { AppHealthDatabase } from '../../domain/app-health-database.aggregate';
import { appHealthMockDatabaseData } from './app-health-mock-database.data';

@Injectable()
export class AppHealthMockDatabaseRepository extends MockRepository<AppHealthDatabase> implements AppHealthIDatabaseRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'AppHealthDatabase';
    public collectionSource: AppHealthDatabase[];
    public deletedAtInstance: AppHealthDatabaseDeletedAt = new AppHealthDatabaseDeletedAt(null);

    constructor()
    {
        super();
        this.createSourceMockData();
    }

    public reset(): void
    {
        this.createSourceMockData();
    }

    private createSourceMockData(): void
    {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>appHealthMockDatabaseData)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(AppHealthDatabase.register(
                new AppHealthDatabaseId(itemCollection.id),
                new AppHealthDatabaseName(itemCollection.name),
                new AppHealthDatabaseType(itemCollection.type),
                new AppHealthDatabaseVersions(itemCollection.versions),
                new AppHealthDatabaseCreatedAt(itemCollection.createdAt),
                new AppHealthDatabaseUpdatedAt(itemCollection.updatedAt),
                new AppHealthDatabaseDeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}
