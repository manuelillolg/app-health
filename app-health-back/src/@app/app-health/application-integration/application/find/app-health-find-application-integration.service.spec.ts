import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AppHealthFindApplicationIntegrationService } from './app-health-find-application-integration.service';
import { AppHealthIApplicationIntegrationRepository } from '../../domain/app-health-application-integration.repository';
import { AppHealthMockApplicationIntegrationRepository } from '../../infrastructure/mock/app-health-mock-application-integration.repository';

describe('AppHealthFindApplicationIntegrationService', () =>
{
    let service: AppHealthFindApplicationIntegrationService;
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
                AppHealthFindApplicationIntegrationService,
                AppHealthMockApplicationIntegrationRepository,
                {
                    provide : AppHealthIApplicationIntegrationRepository,
                    useValue: {
                        find: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthFindApplicationIntegrationService);
        repository = module.get(AppHealthIApplicationIntegrationRepository);
        mockRepository = module.get(AppHealthMockApplicationIntegrationRepository);
    });

    describe('main', () =>
    {
        test('AppHealthFindApplicationIntegrationService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find applicationIntegration', async () =>
        {
            jest.spyOn(repository, 'find').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main()).toBe(mockRepository.collectionSource[0]);
        });
    });
});
