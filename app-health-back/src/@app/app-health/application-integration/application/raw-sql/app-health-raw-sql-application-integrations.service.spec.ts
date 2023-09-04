import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AppHealthRawSQLApplicationIntegrationsService } from './app-health-raw-sql-application-integrations.service';
import { AppHealthIApplicationIntegrationRepository } from '../../domain/app-health-application-integration.repository';
import { AppHealthMockApplicationIntegrationRepository } from '../../infrastructure/mock/app-health-mock-application-integration.repository';

describe('AppHealthRawSQLApplicationIntegrationsService ', () =>
{
    let service: AppHealthRawSQLApplicationIntegrationsService ;
    let repository: AppHealthIApplicationIntegrationRepository;
    let mockRepository: AppHealthMockApplicationIntegrationRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthRawSQLApplicationIntegrationsService ,
                AppHealthMockApplicationIntegrationRepository,
                {
                    provide : AppHealthIApplicationIntegrationRepository,
                    useValue: {
                        rawSQL: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(AppHealthRawSQLApplicationIntegrationsService );
        repository      = module.get(AppHealthIApplicationIntegrationRepository);
        mockRepository  = module.get(AppHealthMockApplicationIntegrationRepository);
    });

    describe('main', () =>
    {
        test('RawSQLApplicationIntegrationsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get applicationIntegrations', async () =>
        {
            jest.spyOn(repository, 'rawSQL').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
