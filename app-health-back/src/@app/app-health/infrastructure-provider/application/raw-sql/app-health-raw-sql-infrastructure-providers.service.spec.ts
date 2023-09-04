import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AppHealthRawSQLInfrastructureProvidersService } from './app-health-raw-sql-infrastructure-providers.service';
import { AppHealthIInfrastructureProviderRepository } from '../../domain/app-health-infrastructure-provider.repository';
import { AppHealthMockInfrastructureProviderRepository } from '../../infrastructure/mock/app-health-mock-infrastructure-provider.repository';

describe('AppHealthRawSQLInfrastructureProvidersService ', () =>
{
    let service: AppHealthRawSQLInfrastructureProvidersService ;
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
                AppHealthRawSQLInfrastructureProvidersService ,
                AppHealthMockInfrastructureProviderRepository,
                {
                    provide : AppHealthIInfrastructureProviderRepository,
                    useValue: {
                        rawSQL: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(AppHealthRawSQLInfrastructureProvidersService );
        repository      = module.get(AppHealthIInfrastructureProviderRepository);
        mockRepository  = module.get(AppHealthMockInfrastructureProviderRepository);
    });

    describe('main', () =>
    {
        test('RawSQLInfrastructureProvidersService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get infrastructureProviders', async () =>
        {
            jest.spyOn(repository, 'rawSQL').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
