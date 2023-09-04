import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AppHealthFindInfrastructureProviderService } from './app-health-find-infrastructure-provider.service';
import { AppHealthIInfrastructureProviderRepository } from '../../domain/app-health-infrastructure-provider.repository';
import { AppHealthMockInfrastructureProviderRepository } from '../../infrastructure/mock/app-health-mock-infrastructure-provider.repository';

describe('AppHealthFindInfrastructureProviderService', () =>
{
    let service: AppHealthFindInfrastructureProviderService;
    let repository: AppHealthIInfrastructureProviderRepository;
    let mockRepository: AppHealthMockInfrastructureProviderRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthFindInfrastructureProviderService,
                AppHealthMockInfrastructureProviderRepository,
                {
                    provide : AppHealthIInfrastructureProviderRepository,
                    useValue: {
                        find: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthFindInfrastructureProviderService);
        repository = module.get(AppHealthIInfrastructureProviderRepository);
        mockRepository = module.get(AppHealthMockInfrastructureProviderRepository);
    });

    describe('main', () =>
    {
        test('AppHealthFindInfrastructureProviderService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find infrastructureProvider', async () =>
        {
            jest.spyOn(repository, 'find').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main()).toBe(mockRepository.collectionSource[0]);
        });
    });
});
