import { Injectable } from '@nestjs/common';
import { MockSeeder } from '@aurorajs.dev/core';
import {
    AppHealthApplicationApiId,
    AppHealthApplicationApiApplicationId,
    AppHealthApplicationApiApiInterfaceTypeId,
    AppHealthApplicationApiScore,
    AppHealthApplicationApiDocumentations,
    AppHealthApplicationApiRequestsPerDay,
    AppHealthApplicationApiApplicationInfrastructureServiceId,
    AppHealthApplicationApiCreatedAt,
    AppHealthApplicationApiUpdatedAt,
    AppHealthApplicationApiDeletedAt,
} from '../../domain/value-objects';
import { AppHealthApplicationApi } from '../../domain/app-health-application-api.aggregate';
import { appHealthMockApplicationApiData } from './app-health-mock-application-api.data';
import * as _ from 'lodash';

@Injectable()
export class AppHealthMockApplicationApiSeeder extends MockSeeder<AppHealthApplicationApi>
{
    public collectionSource: AppHealthApplicationApi[];

    constructor()
    {
        super();
        this._createMock();
    }

    private _createMock(): void
    {
        this.collectionSource = [];

        for (const applicationApi of _.orderBy(appHealthMockApplicationApiData, ['id']))
        {
            this.collectionSource.push(
                AppHealthApplicationApi.register(
                    new AppHealthApplicationApiId(applicationApi.id),
                    new AppHealthApplicationApiApplicationId(applicationApi.applicationId),
                    new AppHealthApplicationApiApiInterfaceTypeId(applicationApi.apiInterfaceTypeId),
                    new AppHealthApplicationApiScore(applicationApi.score),
                    new AppHealthApplicationApiDocumentations(applicationApi.documentations),
                    new AppHealthApplicationApiRequestsPerDay(applicationApi.requestsPerDay),
                    new AppHealthApplicationApiApplicationInfrastructureServiceId(applicationApi.applicationInfrastructureServiceId),
                    new AppHealthApplicationApiCreatedAt({ currentTimestamp: true }),
                    new AppHealthApplicationApiUpdatedAt({ currentTimestamp: true }),
                    new AppHealthApplicationApiDeletedAt(null),
                ),
            );
        }
    }
}
