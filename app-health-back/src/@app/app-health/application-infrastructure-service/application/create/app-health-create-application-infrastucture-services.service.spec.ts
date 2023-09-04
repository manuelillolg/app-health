/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AppHealthCreateApplicationInfrastuctureServicesService } from './app-health-create-application-infrastucture-services.service';
import { AppHealthIApplicationInfrastructureServiceRepository } from '../../domain/app-health-application-infrastructure-service.repository';
import { AppHealthMockApplicationInfrastructureServiceRepository } from '../../infrastructure/mock/app-health-mock-application-infrastructure-service.repository';

describe('AppHealthCreateApplicationInfrastuctureServicesService', () =>
{
    let service: AppHealthCreateApplicationInfrastuctureServicesService;
    let mockRepository: AppHealthMockApplicationInfrastructureServiceRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthCreateApplicationInfrastuctureServicesService,
                AppHealthMockApplicationInfrastructureServiceRepository,
                {
                    provide : AppHealthIApplicationInfrastructureServiceRepository,
                    useValue: {
                        insert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthCreateApplicationInfrastuctureServicesService);
        mockRepository = module.get(AppHealthMockApplicationInfrastructureServiceRepository);
    });

    describe('main', () =>
    {
        test('CreateApplicationInfrastuctureServicesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create applicationInfrastuctureServices and emit event', async () =>
        {
            expect(
                await service.main(
                    mockRepository.collectionSource,
                ),
            )
                .toBe(undefined);
        });
    });
});
