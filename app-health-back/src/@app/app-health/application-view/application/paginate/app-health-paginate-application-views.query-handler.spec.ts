import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResponse } from '@aurorajs.dev/core';

// custom items
import { AppHealthPaginateApplicationViewsQueryHandler } from './app-health-paginate-application-views.query-handler';
import { AppHealthMockApplicationViewRepository } from '@app/app-health/application-view/infrastructure/mock/app-health-mock-application-view.repository';
import { AppHealthIApplicationViewRepository } from '@app/app-health/application-view/domain/app-health-application-view.repository';
import { AppHealthApplicationViewMapper } from '@app/app-health/application-view/domain/app-health-application-view.mapper';
import { AppHealthPaginateApplicationViewsQuery } from './app-health-paginate-application-views.query';
import { AppHealthPaginateApplicationViewsService } from './app-health-paginate-application-views.service';

describe('AppHealthPaginateApplicationViewsQueryHandler', () =>
{
    let queryHandler: AppHealthPaginateApplicationViewsQueryHandler;
    let service: AppHealthPaginateApplicationViewsService;
    let repository: AppHealthMockApplicationViewRepository;
    let mapper: AppHealthApplicationViewMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthPaginateApplicationViewsQueryHandler,
                {
                    provide : AppHealthIApplicationViewRepository,
                    useClass: AppHealthMockApplicationViewRepository,
                },
                {
                    provide : AppHealthPaginateApplicationViewsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthPaginateApplicationViewsQueryHandler>(AppHealthPaginateApplicationViewsQueryHandler);
        service = module.get<AppHealthPaginateApplicationViewsService>(AppHealthPaginateApplicationViewsService);
        repository = <AppHealthMockApplicationViewRepository>module.get<AppHealthIApplicationViewRepository>(AppHealthIApplicationViewRepository);
        mapper = new AppHealthApplicationViewMapper();
    });

    describe('main', () =>
    {
        test('AppHealthPaginateApplicationViewsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an applicationViews paginated', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows : repository.collectionSource.slice(0,10),
                },
            )));
            expect(await queryHandler.execute(
                new AppHealthPaginateApplicationViewsQuery(
                    {
                        offset: 0,
                        limit : 10,
                    },
                ),
            )).toStrictEqual(
                new PaginationResponse(
                    100,
                    10,
                    repository.collectionSource.slice(0,10).map(item => item.toDTO()),
                ),
            );
        });
    });
});
