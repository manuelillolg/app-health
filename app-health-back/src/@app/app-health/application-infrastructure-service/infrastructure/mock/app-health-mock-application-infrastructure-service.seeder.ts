import { Injectable } from '@nestjs/common';
import { MockSeeder } from '@aurorajs.dev/core';
import {
    AppHealthApplicationInfrastructureServiceId,
    AppHealthApplicationInfrastructureServiceApplicationId,
    AppHealthApplicationInfrastructureServiceInfrastructureServiceId,
    AppHealthApplicationInfrastructureServiceAverageCostPerYear,
    AppHealthApplicationInfrastructureServiceScore,
    AppHealthApplicationInfrastructureServiceCreatedAt,
    AppHealthApplicationInfrastructureServiceUpdatedAt,
    AppHealthApplicationInfrastructureServiceDeletedAt,
} from '../../domain/value-objects';
import { AppHealthApplicationInfrastructureService } from '../../domain/app-health-application-infrastructure-service.aggregate';
import { appHealthMockApplicationInfrastructureServiceData } from './app-health-mock-application-infrastructure-service.data';
import * as _ from 'lodash';

@Injectable()
export class AppHealthMockApplicationInfrastructureServiceSeeder extends MockSeeder<AppHealthApplicationInfrastructureService>
{
    public collectionSource: AppHealthApplicationInfrastructureService[];

    constructor()
    {
        super();
        this._createMock();
    }

    private _createMock(): void
    {
        this.collectionSource = [];

        for (const applicationInfrastructureService of _.orderBy(appHealthMockApplicationInfrastructureServiceData, ['id']))
        {
            this.collectionSource.push(
                AppHealthApplicationInfrastructureService.register(
                    new AppHealthApplicationInfrastructureServiceId(applicationInfrastructureService.id),
                    new AppHealthApplicationInfrastructureServiceApplicationId(applicationInfrastructureService.applicationId),
                    new AppHealthApplicationInfrastructureServiceInfrastructureServiceId(applicationInfrastructureService.infrastructureServiceId),
                    new AppHealthApplicationInfrastructureServiceAverageCostPerYear(applicationInfrastructureService.averageCostPerYear),
                    new AppHealthApplicationInfrastructureServiceScore(applicationInfrastructureService.score),
                    new AppHealthApplicationInfrastructureServiceCreatedAt({ currentTimestamp: true }),
                    new AppHealthApplicationInfrastructureServiceUpdatedAt({ currentTimestamp: true }),
                    new AppHealthApplicationInfrastructureServiceDeletedAt(null),
                ),
            );
        }
    }
}
