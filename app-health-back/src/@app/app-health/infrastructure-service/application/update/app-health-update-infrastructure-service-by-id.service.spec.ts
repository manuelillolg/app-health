/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { appHealthMockInfrastructureServiceData } from '@app/app-health/infrastructure-service/infrastructure/mock/app-health-mock-infrastructure-service.data';
import { AppHealthUpdateInfrastructureServiceByIdService } from './app-health-update-infrastructure-service-by-id.service';
import {
    AppHealthInfrastructureServiceId,
    AppHealthInfrastructureServiceProviderId,
    AppHealthInfrastructureServiceName,
    AppHealthInfrastructureServiceScore,
    AppHealthInfrastructureServiceCreatedAt,
    AppHealthInfrastructureServiceUpdatedAt,
    AppHealthInfrastructureServiceDeletedAt,
} from '../../domain/value-objects';
import { AppHealthIInfrastructureServiceRepository } from '../../domain/app-health-infrastructure-service.repository';
import { AppHealthMockInfrastructureServiceRepository } from '../../infrastructure/mock/app-health-mock-infrastructure-service.repository';

describe('AppHealthUpdateInfrastructureServiceByIdService', () =>
{
    let service: AppHealthUpdateInfrastructureServiceByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthUpdateInfrastructureServiceByIdService,
                AppHealthMockInfrastructureServiceRepository,
                {
                    provide : AppHealthIInfrastructureServiceRepository,
                    useValue: {
                        updateById: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthUpdateInfrastructureServiceByIdService);
    });

    describe('main', () =>
    {
        test('AppHealthUpdateInfrastructureServiceByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a infrastructureService and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new AppHealthInfrastructureServiceId(appHealthMockInfrastructureServiceData[0].id),
                        providerId: new AppHealthInfrastructureServiceProviderId(appHealthMockInfrastructureServiceData[0].providerId),
                        name: new AppHealthInfrastructureServiceName(appHealthMockInfrastructureServiceData[0].name),
                        score: new AppHealthInfrastructureServiceScore(appHealthMockInfrastructureServiceData[0].score),
                    },
                    {},
                ),
            ).toBe(undefined);
        });
    });
});
