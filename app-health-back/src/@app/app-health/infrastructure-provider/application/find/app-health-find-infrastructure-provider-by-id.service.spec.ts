import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { appHealthMockInfrastructureProviderData } from '@app/app-health/infrastructure-provider/infrastructure/mock/app-health-mock-infrastructure-provider.data';
import { AppHealthFindInfrastructureProviderByIdService } from './app-health-find-infrastructure-provider-by-id.service';
import { AppHealthInfrastructureProviderId } from '../../domain/value-objects';
import { AppHealthIInfrastructureProviderRepository } from '../../domain/app-health-infrastructure-provider.repository';
import { AppHealthMockInfrastructureProviderRepository } from '../../infrastructure/mock/app-health-mock-infrastructure-provider.repository';

describe('AppHealthFindInfrastructureProviderByIdService', () =>
{
    let service: AppHealthFindInfrastructureProviderByIdService;
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
                AppHealthFindInfrastructureProviderByIdService,
                AppHealthMockInfrastructureProviderRepository,
                {
                    provide : AppHealthIInfrastructureProviderRepository,
                    useValue: {
                        findById: id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthFindInfrastructureProviderByIdService);
        repository = module.get(AppHealthIInfrastructureProviderRepository);
        mockRepository = module.get(AppHealthMockInfrastructureProviderRepository);
    });

    describe('main', () =>
    {
        test('FindInfrastructureProviderByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find infrastructureProvider by id', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new AppHealthInfrastructureProviderId(appHealthMockInfrastructureProviderData[0].id),
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});
