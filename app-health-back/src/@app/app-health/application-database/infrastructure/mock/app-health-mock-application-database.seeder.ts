import { Injectable } from '@nestjs/common';
import { MockSeeder } from '@aurorajs.dev/core';
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
import { AppHealthApplicationDatabase } from '../../domain/app-health-application-database.aggregate';
import { appHealthMockApplicationDatabaseData } from './app-health-mock-application-database.data';
import * as _ from 'lodash';

@Injectable()
export class AppHealthMockApplicationDatabaseSeeder extends MockSeeder<AppHealthApplicationDatabase>
{
    public collectionSource: AppHealthApplicationDatabase[];

    constructor()
    {
        super();
        this._createMock();
    }

    private _createMock(): void
    {
        this.collectionSource = [];

        for (const applicationDatabase of _.orderBy(appHealthMockApplicationDatabaseData, ['id']))
        {
            this.collectionSource.push(
                AppHealthApplicationDatabase.register(
                    new AppHealthApplicationDatabaseId(applicationDatabase.id),
                    new AppHealthApplicationDatabaseApplicationId(applicationDatabase.applicationId),
                    new AppHealthApplicationDatabaseDatabaseId(applicationDatabase.databaseId),
                    new AppHealthApplicationDatabaseVersion(applicationDatabase.version),
                    new AppHealthApplicationDatabaseSize(applicationDatabase.size),
                    new AppHealthApplicationDatabaseScore(applicationDatabase.score),
                    new AppHealthApplicationDatabaseTotalCollectionsTables(applicationDatabase.totalCollectionsTables),
                    new AppHealthApplicationDatabaseTotalFields(applicationDatabase.totalFields),
                    new AppHealthApplicationDatabaseApplicationInfrastructureServiceId(applicationDatabase.applicationInfrastructureServiceId),
                    new AppHealthApplicationDatabaseCreatedAt({ currentTimestamp: true }),
                    new AppHealthApplicationDatabaseUpdatedAt({ currentTimestamp: true }),
                    new AppHealthApplicationDatabaseDeletedAt(null),
                ),
            );
        }
    }
}
