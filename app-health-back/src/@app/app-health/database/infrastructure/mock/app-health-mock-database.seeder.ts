import { Injectable } from '@nestjs/common';
import { MockSeeder } from '@aurorajs.dev/core';
import {
    AppHealthDatabaseId,
    AppHealthDatabaseName,
    AppHealthDatabaseType,
    AppHealthDatabaseVersions,
    AppHealthDatabaseCreatedAt,
    AppHealthDatabaseUpdatedAt,
    AppHealthDatabaseDeletedAt,
} from '../../domain/value-objects';
import { AppHealthDatabase } from '../../domain/app-health-database.aggregate';
import { appHealthMockDatabaseData } from './app-health-mock-database.data';
import * as _ from 'lodash';

@Injectable()
export class AppHealthMockDatabaseSeeder extends MockSeeder<AppHealthDatabase>
{
    public collectionSource: AppHealthDatabase[];

    constructor()
    {
        super();
        this._createMock();
    }

    private _createMock(): void
    {
        this.collectionSource = [];

        for (const database of _.orderBy(appHealthMockDatabaseData, ['id']))
        {
            this.collectionSource.push(
                AppHealthDatabase.register(
                    new AppHealthDatabaseId(database.id),
                    new AppHealthDatabaseName(database.name),
                    new AppHealthDatabaseType(database.type),
                    new AppHealthDatabaseVersions(database.versions),
                    new AppHealthDatabaseCreatedAt({ currentTimestamp: true }),
                    new AppHealthDatabaseUpdatedAt({ currentTimestamp: true }),
                    new AppHealthDatabaseDeletedAt(null),
                ),
            );
        }
    }
}
