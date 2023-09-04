import { Injectable } from '@nestjs/common';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { AppHealthIInfrastructureProviderRepository } from '@app/app-health/infrastructure-provider/domain/app-health-infrastructure-provider.repository';
import {
    AppHealthInfrastructureProviderId,
    AppHealthInfrastructureProviderName,
    AppHealthInfrastructureProviderScore,
    AppHealthInfrastructureProviderCreatedAt,
    AppHealthInfrastructureProviderUpdatedAt,
    AppHealthInfrastructureProviderDeletedAt,
} from '@app/app-health/infrastructure-provider/domain/value-objects';
import { AppHealthInfrastructureProvider } from '../../domain/app-health-infrastructure-provider.aggregate';
import { appHealthMockInfrastructureProviderData } from './app-health-mock-infrastructure-provider.data';

@Injectable()
export class AppHealthMockInfrastructureProviderRepository extends MockRepository<AppHealthInfrastructureProvider> implements AppHealthIInfrastructureProviderRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'AppHealthInfrastructureProvider';
    public collectionSource: AppHealthInfrastructureProvider[];
    public deletedAtInstance: AppHealthInfrastructureProviderDeletedAt = new AppHealthInfrastructureProviderDeletedAt(null);

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

        for (const itemCollection of <any[]>appHealthMockInfrastructureProviderData)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(AppHealthInfrastructureProvider.register(
                new AppHealthInfrastructureProviderId(itemCollection.id),
                new AppHealthInfrastructureProviderName(itemCollection.name),
                new AppHealthInfrastructureProviderScore(itemCollection.score),
                new AppHealthInfrastructureProviderCreatedAt(itemCollection.createdAt),
                new AppHealthInfrastructureProviderUpdatedAt(itemCollection.updatedAt),
                new AppHealthInfrastructureProviderDeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}
