import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AppHealthRawSQLApplicationInfrastuctureServicesService } from './app-health-raw-sql-application-infrastucture-services.service';
import { AppHealthIApplicationInfrastructureServiceRepository } from '../../domain/app-health-application-infrastructure-service.repository';
import { AppHealthMockApplicationInfrastructureServiceRepository } from '../../infrastructure/mock/app-health-mock-application-infrastructure-service.repository';

describe('AppHealthRawSQLApplicationInfrastuctureServicesService ', () =>
{
    let service: AppHealthRawSQLApplicationInfrastuctureServicesService ;
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
                AppHealthRawSQLApplicationInfrastuctureServicesService ,
                AppHealthMockApplicationInfrastructureServiceRepository,
                {
                    provide : AppHealthIApplicationInfrastructureServiceRepository,
                    useValue: {
                        rawSQL: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(AppHealthRawSQLApplicationInfrastuctureServicesService );
        repository      = module.get(AppHealthIApplicationInfrastructureServiceRepository);
        mockRepository  = module.get(AppHealthMockApplicationInfrastructureServiceRepository);
    });

    describe('main', () =>
    {
        test('RawSQLApplicationInfrastuctureServicesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get applicationInfrastuctureServices', async () =>
        {
            jest.spyOn(repository, 'rawSQL').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
