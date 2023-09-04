import { Injectable } from '@nestjs/common';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { AppHealthIInfrastructureServiceRepository } from '@app/app-health/infrastructure-service/domain/app-health-infrastructure-service.repository';
import {
    AppHealthInfrastructureServiceId,
    AppHealthInfrastructureServiceProviderId,
    AppHealthInfrastructureServiceName,
    AppHealthInfrastructureServiceScore,
    AppHealthInfrastructureServiceCreatedAt,
    AppHealthInfrastructureServiceUpdatedAt,
    AppHealthInfrastructureServiceDeletedAt,
} from '@app/app-health/infrastructure-service/domain/value-objects';
import { AppHealthInfrastructureService } from '../../domain/app-health-infrastructure-service.aggregate';
import { appHealthMockInfrastructureServiceData } from './app-health-mock-infrastructure-service.data';

@Injectable()
export class AppHealthMockInfrastructureServiceRepository extends MockRepository<AppHealthInfrastructureService> implements AppHealthIInfrastructureServiceRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'AppHealthInfrastructureService';
    public collectionSource: AppHealthInfrastructureService[];
    public deletedAtInstance: AppHealthInfrastructureServiceDeletedAt = new AppHealthInfrastructureServiceDeletedAt(null);

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

        for (const itemCollection of <any[]>appHealthMockInfrastructureServiceData)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(AppHealthInfrastructureService.register(
                new AppHealthInfrastructureServiceId(itemCollection.id),
                new AppHealthInfrastructureServiceProviderId(itemCollection.providerId),
                new AppHealthInfrastructureServiceName(itemCollection.name),
                new AppHealthInfrastructureServiceScore(itemCollection.score),
                new AppHealthInfrastructureServiceCreatedAt(itemCollection.createdAt),
                new AppHealthInfrastructureServiceUpdatedAt(itemCollection.updatedAt),
                new AppHealthInfrastructureServiceDeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}
