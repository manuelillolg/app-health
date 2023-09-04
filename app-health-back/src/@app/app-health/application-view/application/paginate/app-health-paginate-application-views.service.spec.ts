import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AppHealthPaginateApplicationViewsService } from './app-health-paginate-application-views.service';
import { AppHealthIApplicationViewRepository } from '../../domain/app-health-application-view.repository';
import { AppHealthMockApplicationViewRepository } from '../../infrastructure/mock/app-health-mock-application-view.repository';

describe('AppHealthPaginateApplicationViewsService', () =>
{
    let service: AppHealthPaginateApplicationViewsService;
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
                AppHealthPaginateApplicationViewsService,
                AppHealthMockApplicationViewRepository,
                {
                    provide : AppHealthIApplicationViewRepository,
                    useValue: {
                        paginate: (queryStatement, constraints) => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthPaginateApplicationViewsService);
        repository = module.get(AppHealthIApplicationViewRepository);
        mockRepository = module.get(AppHealthMockApplicationViewRepository);
    });

    describe('main', () =>
    {
        test('AppHealthPaginateApplicationViewsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should paginate applicationViews', async () =>
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
