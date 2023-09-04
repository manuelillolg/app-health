import { Injectable } from '@nestjs/common';
import { MockSeeder } from '@aurorajs.dev/core';
import {
    AppHealthApiInterfaceTypeId,
    AppHealthApiInterfaceTypeName,
    AppHealthApiInterfaceTypeScore,
    AppHealthApiInterfaceTypeCreatedAt,
    AppHealthApiInterfaceTypeUpdatedAt,
    AppHealthApiInterfaceTypeDeletedAt,
} from '../../domain/value-objects';
import { AppHealthApiInterfaceType } from '../../domain/app-health-api-interface-type.aggregate';
import { appHealthMockApiInterfaceTypeData } from './app-health-mock-api-interface-type.data';
import * as _ from 'lodash';

@Injectable()
export class AppHealthMockApiInterfaceTypeSeeder extends MockSeeder<AppHealthApiInterfaceType>
{
    public collectionSource: AppHealthApiInterfaceType[];

    constructor()
    {
        super();
        this._createMock();
    }

    private _createMock(): void
    {
        this.collectionSource = [];

        for (const apiInterfaceType of _.orderBy(appHealthMockApiInterfaceTypeData, ['id']))
        {
            this.collectionSource.push(
                AppHealthApiInterfaceType.register(
                    new AppHealthApiInterfaceTypeId(apiInterfaceType.id),
                    new AppHealthApiInterfaceTypeName(apiInterfaceType.name),
                    new AppHealthApiInterfaceTypeScore(apiInterfaceType.score),
                    new AppHealthApiInterfaceTypeCreatedAt({ currentTimestamp: true }),
                    new AppHealthApiInterfaceTypeUpdatedAt({ currentTimestamp: true }),
                    new AppHealthApiInterfaceTypeDeletedAt(null),
                ),
            );
        }
    }
}
