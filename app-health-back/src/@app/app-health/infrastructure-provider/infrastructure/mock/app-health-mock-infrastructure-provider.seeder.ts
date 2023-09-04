import { Injectable } from '@nestjs/common';
import { MockSeeder } from '@aurorajs.dev/core';
import {
    AppHealthInfrastructureProviderId,
    AppHealthInfrastructureProviderName,
    AppHealthInfrastructureProviderScore,
    AppHealthInfrastructureProviderCreatedAt,
    AppHealthInfrastructureProviderUpdatedAt,
    AppHealthInfrastructureProviderDeletedAt,
} from '../../domain/value-objects';
import { AppHealthInfrastructureProvider } from '../../domain/app-health-infrastructure-provider.aggregate';
import { appHealthMockInfrastructureProviderData } from './app-health-mock-infrastructure-provider.data';
import * as _ from 'lodash';

@Injectable()
export class AppHealthMockInfrastructureProviderSeeder extends MockSeeder<AppHealthInfrastructureProvider>
{
    public collectionSource: AppHealthInfrastructureProvider[];

    constructor()
    {
        super();
        this._createMock();
    }

    private _createMock(): void
    {
        this.collectionSource = [];

        for (const infrastructureProvider of _.orderBy(appHealthMockInfrastructureProviderData, ['id']))
        {
            this.collectionSource.push(
                AppHealthInfrastructureProvider.register(
                    new AppHealthInfrastructureProviderId(infrastructureProvider.id),
                    new AppHealthInfrastructureProviderName(infrastructureProvider.name),
                    new AppHealthInfrastructureProviderScore(infrastructureProvider.score),
                    new AppHealthInfrastructureProviderCreatedAt({ currentTimestamp: true }),
                    new AppHealthInfrastructureProviderUpdatedAt({ currentTimestamp: true }),
                    new AppHealthInfrastructureProviderDeletedAt(null),
                ),
            );
        }
    }
}
