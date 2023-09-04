import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AppHealthFindApplicationViewService } from './app-health-find-application-view.service';
import { AppHealthIApplicationViewRepository } from '../../domain/app-health-application-view.repository';
import { AppHealthMockApplicationViewRepository } from '../../infrastructure/mock/app-health-mock-application-view.repository';

describe('AppHealthFindApplicationViewService', () =>
{
    let service: AppHealthFindApplicationViewService;
    let repository: AppHealthIApplicationViewRepository;
    let mockRepository: AppHealthMockApplicationViewRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthFindApplicationViewService,
                AppHealthMockApplicationViewRepository,
                {
                    provide : AppHealthIApplicationViewRepository,
                    useValue: {
                        find: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthFindApplicationViewService);
        repository = module.get(AppHealthIApplicationViewRepository);
        mockRepository = module.get(AppHealthMockApplicationViewRepository);
    });

    describe('main', () =>
    {
        test('AppHealthFindApplicationViewService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find applicationView', async () =>
        {
            jest.spyOn(repository, 'find').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main()).toBe(mockRepository.collectionSource[0]);
        });
    });
});
