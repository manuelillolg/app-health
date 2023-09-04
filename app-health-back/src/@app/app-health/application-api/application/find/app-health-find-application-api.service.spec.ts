import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AppHealthFindApplicationApiService } from './app-health-find-application-api.service';
import { AppHealthIApplicationApiRepository } from '../../domain/app-health-application-api.repository';
import { AppHealthMockApplicationApiRepository } from '../../infrastructure/mock/app-health-mock-application-api.repository';

describe('AppHealthFindApplicationApiService', () =>
{
    let service: AppHealthFindApplicationApiService;
    let repository: AppHealthIApplicationApiRepository;
    let mockRepository: AppHealthMockApplicationApiRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthFindApplicationApiService,
                AppHealthMockApplicationApiRepository,
                {
                    provide : AppHealthIApplicationApiRepository,
                    useValue: {
                        find: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthFindApplicationApiService);
        repository = module.get(AppHealthIApplicationApiRepository);
        mockRepository = module.get(AppHealthMockApplicationApiRepository);
    });

    describe('main', () =>
    {
        test('AppHealthFindApplicationApiService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find applicationApi', async () =>
        {
            jest.spyOn(repository, 'find').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main()).toBe(mockRepository.collectionSource[0]);
        });
    });
});
