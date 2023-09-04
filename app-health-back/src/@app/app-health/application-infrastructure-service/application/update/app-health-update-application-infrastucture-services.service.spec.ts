/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { appHealthMockApplicationInfrastructureServiceData } from '@app/app-health/application-infrastructure-service/infrastructure/mock/app-health-mock-application-infrastructure-service.data';
import { AppHealthUpdateApplicationInfrastuctureServicesService } from './app-health-update-application-infrastucture-services.service';
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
import { AppHealthIApplicationInfrastructureServiceRepository } from '../../domain/app-health-application-infrastructure-service.repository';
import { AppHealthMockApplicationInfrastructureServiceRepository } from '../../infrastructure/mock/app-health-mock-application-infrastructure-service.repository';

describe('AppHealthUpdateApplicationInfrastuctureServicesService', () =>
{
    let service: AppHealthUpdateApplicationInfrastuctureServicesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthUpdateApplicationInfrastuctureServicesService,
                AppHealthMockApplicationInfrastructureServiceRepository,
                {
                    provide : AppHealthIApplicationInfrastructureServiceRepository,
                    useValue: {
                        update: () => { /**/ },
                        get   : () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthUpdateApplicationInfrastuctureServicesService);
    });

    describe('main', () =>
    {
        test('UpdateApplicationInfrastuctureServicesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a applicationInfrastuctureServices and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new AppHealthApplicationInfrastructureServiceId(appHealthMockApplicationInfrastructureServiceData[0].id),
                        applicationId: new AppHealthApplicationInfrastructureServiceApplicationId(appHealthMockApplicationInfrastructureServiceData[0].applicationId),
                        infrastructureServiceId: new AppHealthApplicationInfrastructureServiceInfrastructureServiceId(appHealthMockApplicationInfrastructureServiceData[0].infrastructureServiceId),
                        averageCostPerYear: new AppHealthApplicationInfrastructureServiceAverageCostPerYear(appHealthMockApplicationInfrastructureServiceData[0].averageCostPerYear),
                        score: new AppHealthApplicationInfrastructureServiceScore(appHealthMockApplicationInfrastructureServiceData[0].score),
                    },
                    {},
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});
