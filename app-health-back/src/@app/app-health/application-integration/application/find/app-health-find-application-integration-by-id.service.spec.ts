import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { appHealthMockApplicationIntegrationData } from '@app/app-health/application-integration/infrastructure/mock/app-health-mock-application-integration.data';
import { AppHealthFindApplicationIntegrationByIdService } from './app-health-find-application-integration-by-id.service';
import { AppHealthApplicationIntegrationId } from '../../domain/value-objects';
import { AppHealthIApplicationIntegrationRepository } from '../../domain/app-health-application-integration.repository';
import { AppHealthMockApplicationIntegrationRepository } from '../../infrastructure/mock/app-health-mock-application-integration.repository';

describe('AppHealthFindApplicationIntegrationByIdService', () =>
{
    let service: AppHealthFindApplicationIntegrationByIdService;
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
                AppHealthFindApplicationIntegrationByIdService,
                AppHealthMockApplicationIntegrationRepository,
                {
                    provide : AppHealthIApplicationIntegrationRepository,
                    useValue: {
                        findById: id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthFindApplicationIntegrationByIdService);
        repository = module.get(AppHealthIApplicationIntegrationRepository);
        mockRepository = module.get(AppHealthMockApplicationIntegrationRepository);
    });

    describe('main', () =>
    {
        test('FindApplicationIntegrationByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find applicationIntegration by id', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new AppHealthApplicationIntegrationId(appHealthMockApplicationIntegrationData[0].id),
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});
