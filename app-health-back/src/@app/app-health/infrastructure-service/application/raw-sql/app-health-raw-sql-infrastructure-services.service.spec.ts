import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AppHealthRawSQLInfrastructureServicesService } from './app-health-raw-sql-infrastructure-services.service';
import { AppHealthIInfrastructureServiceRepository } from '../../domain/app-health-infrastructure-service.repository';
import { AppHealthMockInfrastructureServiceRepository } from '../../infrastructure/mock/app-health-mock-infrastructure-service.repository';

describe('AppHealthRawSQLInfrastructureServicesService ', () =>
{
    let service: AppHealthRawSQLInfrastructureServicesService ;
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
                AppHealthRawSQLInfrastructureServicesService ,
                AppHealthMockInfrastructureServiceRepository,
                {
                    provide : AppHealthIInfrastructureServiceRepository,
                    useValue: {
                        rawSQL: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(AppHealthRawSQLInfrastructureServicesService );
        repository      = module.get(AppHealthIInfrastructureServiceRepository);
        mockRepository  = module.get(AppHealthMockInfrastructureServiceRepository);
    });

    describe('main', () =>
    {
        test('RawSQLInfrastructureServicesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get infrastructureServices', async () =>
        {
            jest.spyOn(repository, 'rawSQL').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
