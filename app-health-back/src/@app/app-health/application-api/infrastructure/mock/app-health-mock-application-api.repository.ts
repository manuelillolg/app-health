import { Injectable } from '@nestjs/common';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { AppHealthIApplicationApiRepository } from '@app/app-health/application-api/domain/app-health-application-api.repository';
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
} from '@app/app-health/application-api/domain/value-objects';
import { AppHealthApplicationApi } from '../../domain/app-health-application-api.aggregate';
import { appHealthMockApplicationApiData } from './app-health-mock-application-api.data';

@Injectable()
export class AppHealthMockApplicationApiRepository extends MockRepository<AppHealthApplicationApi> implements AppHealthIApplicationApiRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'AppHealthApplicationApi';
    public collectionSource: AppHealthApplicationApi[];
    public deletedAtInstance: AppHealthApplicationApiDeletedAt = new AppHealthApplicationApiDeletedAt(null);

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

        for (const itemCollection of <any[]>appHealthMockApplicationApiData)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(AppHealthApplicationApi.register(
                new AppHealthApplicationApiId(itemCollection.id),
                new AppHealthApplicationApiApplicationId(itemCollection.applicationId),
                new AppHealthApplicationApiApiInterfaceTypeId(itemCollection.apiInterfaceTypeId),
                new AppHealthApplicationApiScore(itemCollection.score),
                new AppHealthApplicationApiDocumentations(itemCollection.documentations),
                new AppHealthApplicationApiRequestsPerDay(itemCollection.requestsPerDay),
                new AppHealthApplicationApiApplicationInfrastructureServiceId(itemCollection.applicationInfrastructureServiceId),
                new AppHealthApplicationApiCreatedAt(itemCollection.createdAt),
                new AppHealthApplicationApiUpdatedAt(itemCollection.updatedAt),
                new AppHealthApplicationApiDeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}
