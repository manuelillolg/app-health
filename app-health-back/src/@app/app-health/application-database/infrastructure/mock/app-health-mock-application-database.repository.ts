import { Injectable } from '@nestjs/common';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { AppHealthIApplicationDatabaseRepository } from '@app/app-health/application-database/domain/app-health-application-database.repository';
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
} from '@app/app-health/application-database/domain/value-objects';
import { AppHealthApplicationDatabase } from '../../domain/app-health-application-database.aggregate';
import { appHealthMockApplicationDatabaseData } from './app-health-mock-application-database.data';

@Injectable()
export class AppHealthMockApplicationDatabaseRepository extends MockRepository<AppHealthApplicationDatabase> implements AppHealthIApplicationDatabaseRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'AppHealthApplicationDatabase';
    public collectionSource: AppHealthApplicationDatabase[];
    public deletedAtInstance: AppHealthApplicationDatabaseDeletedAt = new AppHealthApplicationDatabaseDeletedAt(null);

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

        for (const itemCollection of <any[]>appHealthMockApplicationDatabaseData)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(AppHealthApplicationDatabase.register(
                new AppHealthApplicationDatabaseId(itemCollection.id),
                new AppHealthApplicationDatabaseApplicationId(itemCollection.applicationId),
                new AppHealthApplicationDatabaseDatabaseId(itemCollection.databaseId),
                new AppHealthApplicationDatabaseVersion(itemCollection.version),
                new AppHealthApplicationDatabaseSize(itemCollection.size),
                new AppHealthApplicationDatabaseScore(itemCollection.score),
                new AppHealthApplicationDatabaseTotalCollectionsTables(itemCollection.totalCollectionsTables),
                new AppHealthApplicationDatabaseTotalFields(itemCollection.totalFields),
                new AppHealthApplicationDatabaseApplicationInfrastructureServiceId(itemCollection.applicationInfrastructureServiceId),
                new AppHealthApplicationDatabaseCreatedAt(itemCollection.createdAt),
                new AppHealthApplicationDatabaseUpdatedAt(itemCollection.updatedAt),
                new AppHealthApplicationDatabaseDeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}
