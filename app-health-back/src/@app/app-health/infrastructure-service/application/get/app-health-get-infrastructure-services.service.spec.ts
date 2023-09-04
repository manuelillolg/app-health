import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AppHealthGetInfrastructureServicesService } from './app-health-get-infrastructure-services.service';
import { AppHealthIInfrastructureServiceRepository } from '../../domain/app-health-infrastructure-service.repository';
import { AppHealthMockInfrastructureServiceRepository } from '../../infrastructure/mock/app-health-mock-infrastructure-service.repository';

describe('AppHealthGetInfrastructureServicesService', () =>
{
    let service: AppHealthGetInfrastructureServicesService;
    let repository: AppHealthIInfrastructureServiceRepository;
    let mockRepository: AppHealthMockInfrastructureServiceRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthGetInfrastructureServicesService,
                AppHealthMockInfrastructureServiceRepository,
                {
                    provide : AppHealthIInfrastructureServiceRepository,
                    useValue: {
                        get: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthGetInfrastructureServicesService);
        repository = module.get(AppHealthIInfrastructureServiceRepository);
        mockRepository = module.get(AppHealthMockInfrastructureServiceRepository);
    });

    describe('main', () =>
    {
        test('GetInfrastructureServicesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get infrastructureServices', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
