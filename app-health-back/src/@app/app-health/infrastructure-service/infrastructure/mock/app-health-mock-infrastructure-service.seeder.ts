import { Injectable } from '@nestjs/common';
import { MockSeeder } from '@aurorajs.dev/core';
import {
    AppHealthInfrastructureServiceId,
    AppHealthInfrastructureServiceProviderId,
    AppHealthInfrastructureServiceName,
    AppHealthInfrastructureServiceScore,
    AppHealthInfrastructureServiceCreatedAt,
    AppHealthInfrastructureServiceUpdatedAt,
    AppHealthInfrastructureServiceDeletedAt,
} from '../../domain/value-objects';
import { AppHealthInfrastructureService } from '../../domain/app-health-infrastructure-service.aggregate';
import { appHealthMockInfrastructureServiceData } from './app-health-mock-infrastructure-service.data';
import * as _ from 'lodash';

@Injectable()
export class AppHealthMockInfrastructureServiceSeeder extends MockSeeder<AppHealthInfrastructureService>
{
    public collectionSource: AppHealthInfrastructureService[];

    constructor()
    {
        super();
        this._createMock();
    }

    private _createMock(): void
    {
        this.collectionSource = [];

        for (const infrastructureService of _.orderBy(appHealthMockInfrastructureServiceData, ['id']))
        {
            this.collectionSource.push(
                AppHealthInfrastructureService.register(
                    new AppHealthInfrastructureServiceId(infrastructureService.id),
                    new AppHealthInfrastructureServiceProviderId(infrastructureService.providerId),
                    new AppHealthInfrastructureServiceName(infrastructureService.name),
                    new AppHealthInfrastructureServiceScore(infrastructureService.score),
                    new AppHealthInfrastructureServiceCreatedAt({ currentTimestamp: true }),
                    new AppHealthInfrastructureServiceUpdatedAt({ currentTimestamp: true }),
                    new AppHealthInfrastructureServiceDeletedAt(null),
                ),
            );
        }
    }
}
