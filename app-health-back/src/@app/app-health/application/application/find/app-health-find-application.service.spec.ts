import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AppHealthFindApplicationService } from './app-health-find-application.service';
import { AppHealthIApplicationRepository } from '../../domain/app-health-application.repository';
import { AppHealthMockApplicationRepository } from '../../infrastructure/mock/app-health-mock-application.repository';

describe('AppHealthFindApplicationService', () =>
{
    let service: AppHealthFindApplicationService;
    let repository: AppHealthIApplicationRepository;
    let mockRepository: AppHealthMockApplicationRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthFindApplicationService,
                AppHealthMockApplicationRepository,
                {
                    provide : AppHealthIApplicationRepository,
                    useValue: {
                        find: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthFindApplicationService);
        repository = module.get(AppHealthIApplicationRepository);
        mockRepository = module.get(AppHealthMockApplicationRepository);
    });

    describe('main', () =>
    {
        test('AppHealthFindApplicationService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find application', async () =>
        {
            jest.spyOn(repository, 'find').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main()).toBe(mockRepository.collectionSource[0]);
        });
    });
});
