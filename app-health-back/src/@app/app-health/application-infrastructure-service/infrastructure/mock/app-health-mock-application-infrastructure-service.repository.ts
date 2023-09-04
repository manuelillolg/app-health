import { Injectable } from '@nestjs/common';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { AppHealthIApplicationInfrastructureServiceRepository } from '@app/app-health/application-infrastructure-service/domain/app-health-application-infrastructure-service.repository';
import {
    AppHealthApplicationInfrastructureServiceId,
    AppHealthApplicationInfrastructureServiceApplicationId,
    AppHealthApplicationInfrastructureServiceInfrastructureServiceId,
    AppHealthApplicationInfrastructureServiceAverageCostPerYear,
    AppHealthApplicationInfrastructureServiceScore,
    AppHealthApplicationInfrastructureServiceCreatedAt,
    AppHealthApplicationInfrastructureServiceUpdatedAt,
    AppHealthApplicationInfrastructureServiceDeletedAt,
} from '@app/app-health/application-infrastructure-service/domain/value-objects';
import { AppHealthApplicationInfrastructureService } from '../../domain/app-health-application-infrastructure-service.aggregate';
import { appHealthMockApplicationInfrastructureServiceData } from './app-health-mock-application-infrastructure-service.data';

@Injectable()
export class AppHealthMockApplicationInfrastructureServiceRepository extends MockRepository<AppHealthApplicationInfrastructureService> implements AppHealthIApplicationInfrastructureServiceRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'AppHealthApplicationInfrastructureService';
    public collectionSource: AppHealthApplicationInfrastructureService[];
    public deletedAtInstance: AppHealthApplicationInfrastructureServiceDeletedAt = new AppHealthApplicationInfrastructureServiceDeletedAt(null);

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

        for (const itemCollection of <any[]>appHealthMockApplicationInfrastructureServiceData)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(AppHealthApplicationInfrastructureService.register(
                new AppHealthApplicationInfrastructureServiceId(itemCollection.id),
                new AppHealthApplicationInfrastructureServiceApplicationId(itemCollection.applicationId),
                new AppHealthApplicationInfrastructureServiceInfrastructureServiceId(itemCollection.infrastructureServiceId),
                new AppHealthApplicationInfrastructureServiceAverageCostPerYear(itemCollection.averageCostPerYear),
                new AppHealthApplicationInfrastructureServiceScore(itemCollection.score),
                new AppHealthApplicationInfrastructureServiceCreatedAt(itemCollection.createdAt),
                new AppHealthApplicationInfrastructureServiceUpdatedAt(itemCollection.updatedAt),
                new AppHealthApplicationInfrastructureServiceDeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}
