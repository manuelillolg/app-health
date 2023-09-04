import { Injectable } from '@nestjs/common';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { AppHealthIApplicationIntegrationRepository } from '@app/app-health/application-integration/domain/app-health-application-integration.repository';
import {
    AppHealthApplicationIntegrationId,
    AppHealthApplicationIntegrationName,
    AppHealthApplicationIntegrationDescription,
    AppHealthApplicationIntegrationSourceApplicationId,
    AppHealthApplicationIntegrationTargetApplicationId,
    AppHealthApplicationIntegrationApiInterfaceTypeId,
    AppHealthApplicationIntegrationInterfaceNumbers,
    AppHealthApplicationIntegrationModality,
    AppHealthApplicationIntegrationScore,
    AppHealthApplicationIntegrationDocumentations,
    AppHealthApplicationIntegrationCreatedAt,
    AppHealthApplicationIntegrationUpdatedAt,
    AppHealthApplicationIntegrationDeletedAt,
} from '@app/app-health/application-integration/domain/value-objects';
import { AppHealthApplicationIntegration } from '../../domain/app-health-application-integration.aggregate';
import { appHealthMockApplicationIntegrationData } from './app-health-mock-application-integration.data';

@Injectable()
export class AppHealthMockApplicationIntegrationRepository extends MockRepository<AppHealthApplicationIntegration> implements AppHealthIApplicationIntegrationRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'AppHealthApplicationIntegration';
    public collectionSource: AppHealthApplicationIntegration[];
    public deletedAtInstance: AppHealthApplicationIntegrationDeletedAt = new AppHealthApplicationIntegrationDeletedAt(null);

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

        for (const itemCollection of <any[]>appHealthMockApplicationIntegrationData)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(AppHealthApplicationIntegration.register(
                new AppHealthApplicationIntegrationId(itemCollection.id),
                new AppHealthApplicationIntegrationName(itemCollection.name),
                new AppHealthApplicationIntegrationDescription(itemCollection.description),
                new AppHealthApplicationIntegrationSourceApplicationId(itemCollection.sourceApplicationId),
                new AppHealthApplicationIntegrationTargetApplicationId(itemCollection.targetApplicationId),
                new AppHealthApplicationIntegrationApiInterfaceTypeId(itemCollection.apiInterfaceTypeId),
                new AppHealthApplicationIntegrationInterfaceNumbers(itemCollection.interfaceNumbers),
                new AppHealthApplicationIntegrationModality(itemCollection.modality),
                new AppHealthApplicationIntegrationScore(itemCollection.score),
                new AppHealthApplicationIntegrationDocumentations(itemCollection.documentations),
                new AppHealthApplicationIntegrationCreatedAt(itemCollection.createdAt),
                new AppHealthApplicationIntegrationUpdatedAt(itemCollection.updatedAt),
                new AppHealthApplicationIntegrationDeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}
