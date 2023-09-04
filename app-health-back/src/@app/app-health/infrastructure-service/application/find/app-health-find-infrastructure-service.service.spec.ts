import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AppHealthFindInfrastructureServiceService } from './app-health-find-infrastructure-service.service';
import { AppHealthIInfrastructureServiceRepository } from '../../domain/app-health-infrastructure-service.repository';
import { AppHealthMockInfrastructureServiceRepository } from '../../infrastructure/mock/app-health-mock-infrastructure-service.repository';

describe('AppHealthFindInfrastructureServiceService', () =>
{
    let service: AppHealthFindInfrastructureServiceService;
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
                AppHealthFindInfrastructureServiceService,
                AppHealthMockInfrastructureServiceRepository,
                {
                    provide : AppHealthIInfrastructureServiceRepository,
                    useValue: {
                        find: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthFindInfrastructureServiceService);
        repository = module.get(AppHealthIInfrastructureServiceRepository);
        mockRepository = module.get(AppHealthMockInfrastructureServiceRepository);
    });

    describe('main', () =>
    {
        test('AppHealthFindInfrastructureServiceService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find infrastructureService', async () =>
        {
            jest.spyOn(repository, 'find').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main()).toBe(mockRepository.collectionSource[0]);
        });
    });
});
