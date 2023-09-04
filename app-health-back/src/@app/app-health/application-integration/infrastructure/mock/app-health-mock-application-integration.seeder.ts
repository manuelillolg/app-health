import { Injectable } from '@nestjs/common';
import { MockSeeder } from '@aurorajs.dev/core';
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
} from '../../domain/value-objects';
import { AppHealthApplicationIntegration } from '../../domain/app-health-application-integration.aggregate';
import { appHealthMockApplicationIntegrationData } from './app-health-mock-application-integration.data';
import * as _ from 'lodash';

@Injectable()
export class AppHealthMockApplicationIntegrationSeeder extends MockSeeder<AppHealthApplicationIntegration>
{
    public collectionSource: AppHealthApplicationIntegration[];

    constructor()
    {
        super();
        this._createMock();
    }

    private _createMock(): void
    {
        this.collectionSource = [];

        for (const applicationIntegration of _.orderBy(appHealthMockApplicationIntegrationData, ['id']))
        {
            this.collectionSource.push(
                AppHealthApplicationIntegration.register(
                    new AppHealthApplicationIntegrationId(applicationIntegration.id),
                    new AppHealthApplicationIntegrationName(applicationIntegration.name),
                    new AppHealthApplicationIntegrationDescription(applicationIntegration.description),
                    new AppHealthApplicationIntegrationSourceApplicationId(applicationIntegration.sourceApplicationId),
                    new AppHealthApplicationIntegrationTargetApplicationId(applicationIntegration.targetApplicationId),
                    new AppHealthApplicationIntegrationApiInterfaceTypeId(applicationIntegration.apiInterfaceTypeId),
                    new AppHealthApplicationIntegrationInterfaceNumbers(applicationIntegration.interfaceNumbers),
                    new AppHealthApplicationIntegrationModality(applicationIntegration.modality),
                    new AppHealthApplicationIntegrationScore(applicationIntegration.score),
                    new AppHealthApplicationIntegrationDocumentations(applicationIntegration.documentations),
                    new AppHealthApplicationIntegrationCreatedAt({ currentTimestamp: true }),
                    new AppHealthApplicationIntegrationUpdatedAt({ currentTimestamp: true }),
                    new AppHealthApplicationIntegrationDeletedAt(null),
                ),
            );
        }
    }
}
