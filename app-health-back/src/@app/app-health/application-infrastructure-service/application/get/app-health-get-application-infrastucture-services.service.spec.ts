import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AppHealthGetApplicationInfrastuctureServicesService } from './app-health-get-application-infrastucture-services.service';
import { AppHealthIApplicationInfrastructureServiceRepository } from '../../domain/app-health-application-infrastructure-service.repository';
import { AppHealthMockApplicationInfrastructureServiceRepository } from '../../infrastructure/mock/app-health-mock-application-infrastructure-service.repository';

describe('AppHealthGetApplicationInfrastuctureServicesService', () =>
{
    let service: AppHealthGetApplicationInfrastuctureServicesService;
    let repository: AppHealthIApplicationInfrastructureServiceRepository;
    let mockRepository: AppHealthMockApplicationInfrastructureServiceRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthGetApplicationInfrastuctureServicesService,
                AppHealthMockApplicationInfrastructureServiceRepository,
                {
                    provide : AppHealthIApplicationInfrastructureServiceRepository,
                    useValue: {
                        get: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthGetApplicationInfrastuctureServicesService);
        repository = module.get(AppHealthIApplicationInfrastructureServiceRepository);
        mockRepository = module.get(AppHealthMockApplicationInfrastructureServiceRepository);
    });

    describe('main', () =>
    {
        test('GetApplicationInfrastuctureServicesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get applicationInfrastuctureServices', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
