import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AppHealthGetApplicationIntegrationsService } from './app-health-get-application-integrations.service';
import { AppHealthIApplicationIntegrationRepository } from '../../domain/app-health-application-integration.repository';
import { AppHealthMockApplicationIntegrationRepository } from '../../infrastructure/mock/app-health-mock-application-integration.repository';

describe('AppHealthGetApplicationIntegrationsService', () =>
{
    let service: AppHealthGetApplicationIntegrationsService;
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
                AppHealthGetApplicationIntegrationsService,
                AppHealthMockApplicationIntegrationRepository,
                {
                    provide : AppHealthIApplicationIntegrationRepository,
                    useValue: {
                        get: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthGetApplicationIntegrationsService);
        repository = module.get(AppHealthIApplicationIntegrationRepository);
        mockRepository = module.get(AppHealthMockApplicationIntegrationRepository);
    });

    describe('main', () =>
    {
        test('GetApplicationIntegrationsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get applicationIntegrations', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
