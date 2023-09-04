import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AppHealthPaginateApplicationIntegrationsService } from './app-health-paginate-application-integrations.service';
import { AppHealthIApplicationIntegrationRepository } from '../../domain/app-health-application-integration.repository';
import { AppHealthMockApplicationIntegrationRepository } from '../../infrastructure/mock/app-health-mock-application-integration.repository';

describe('AppHealthPaginateApplicationIntegrationsService', () =>
{
    let service: AppHealthPaginateApplicationIntegrationsService;
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
                AppHealthPaginateApplicationIntegrationsService,
                AppHealthMockApplicationIntegrationRepository,
                {
                    provide : AppHealthIApplicationIntegrationRepository,
                    useValue: {
                        paginate: (queryStatement, constraints) => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthPaginateApplicationIntegrationsService);
        repository = module.get(AppHealthIApplicationIntegrationRepository);
        mockRepository = module.get(AppHealthMockApplicationIntegrationRepository);
    });

    describe('main', () =>
    {
        test('AppHealthPaginateApplicationIntegrationsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should paginate applicationIntegrations', async () =>
        {
            jest.spyOn(repository, 'paginate').mockImplementation(() => new Promise(resolve => resolve({
                total: mockRepository.collectionSource.slice(0,10).length,
                count: mockRepository.collectionSource.slice(0,10).length,
                rows : mockRepository.collectionSource.slice(0,10),
            })));
            expect(await service.main({
                offset: 0,
                limit : 10
            })).toStrictEqual({
                total: mockRepository.collectionSource.slice(0,10).length,
                count: mockRepository.collectionSource.slice(0,10).length,
                rows : mockRepository.collectionSource.slice(0,10),
            });
        });
    });
});
