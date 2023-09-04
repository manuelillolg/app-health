/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { appHealthMockApplicationIntegrationData } from '@app/app-health/application-integration/infrastructure/mock/app-health-mock-application-integration.data';
import { AppHealthCreateApplicationIntegrationService } from './app-health-create-application-integration.service';
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
import { AppHealthIApplicationIntegrationRepository } from '../../domain/app-health-application-integration.repository';
import { AppHealthMockApplicationIntegrationRepository } from '../../infrastructure/mock/app-health-mock-application-integration.repository';

describe('AppHealthCreateApplicationIntegrationService', () =>

{
    let service: AppHealthCreateApplicationIntegrationService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthCreateApplicationIntegrationService,
                AppHealthMockApplicationIntegrationRepository,
                {
                    provide : AppHealthIApplicationIntegrationRepository,
                    useValue: {
                        create: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthCreateApplicationIntegrationService);
    });

    describe('main', () =>
    {
        test('AppHealthCreateApplicationIntegrationService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create a applicationIntegration and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new AppHealthApplicationIntegrationId(appHealthMockApplicationIntegrationData[0].id),
                        name: new AppHealthApplicationIntegrationName(appHealthMockApplicationIntegrationData[0].name),
                        description: new AppHealthApplicationIntegrationDescription(appHealthMockApplicationIntegrationData[0].description),
                        sourceApplicationId: new AppHealthApplicationIntegrationSourceApplicationId(appHealthMockApplicationIntegrationData[0].sourceApplicationId),
                        targetApplicationId: new AppHealthApplicationIntegrationTargetApplicationId(appHealthMockApplicationIntegrationData[0].targetApplicationId),
                        apiInterfaceTypeId: new AppHealthApplicationIntegrationApiInterfaceTypeId(appHealthMockApplicationIntegrationData[0].apiInterfaceTypeId),
                        interfaceNumbers: new AppHealthApplicationIntegrationInterfaceNumbers(appHealthMockApplicationIntegrationData[0].interfaceNumbers),
                        modality: new AppHealthApplicationIntegrationModality(appHealthMockApplicationIntegrationData[0].modality),
                        score: new AppHealthApplicationIntegrationScore(appHealthMockApplicationIntegrationData[0].score),
                        documentations: new AppHealthApplicationIntegrationDocumentations(appHealthMockApplicationIntegrationData[0].documentations),
                    },
                ),
            )
                .toBe(undefined);
        });
    });
});
