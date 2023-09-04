/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { appHealthMockApplicationInfrastructureServiceData } from '@app/app-health/application-infrastructure-service/infrastructure/mock/app-health-mock-application-infrastructure-service.data';
import { AppHealthCreateApplicationInfrastructureServiceService } from './app-health-create-application-infrastructure-service.service';
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

describe('AppHealthCreateApplicationInfrastructureServiceService', () =>

{
    let service: AppHealthCreateApplicationInfrastructureServiceService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthCreateApplicationInfrastructureServiceService,
                AppHealthMockApplicationInfrastructureServiceRepository,
                {
                    provide : AppHealthIApplicationInfrastructureServiceRepository,
                    useValue: {
                        create: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthCreateApplicationInfrastructureServiceService);
    });

    describe('main', () =>
    {
        test('AppHealthCreateApplicationInfrastructureServiceService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create a applicationInfrastructureService and emit event', async () =>
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
                ),
            )
                .toBe(undefined);
        });
    });
});
