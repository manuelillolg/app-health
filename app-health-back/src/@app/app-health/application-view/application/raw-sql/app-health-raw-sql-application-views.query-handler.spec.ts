import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthMockApplicationViewRepository } from '@app/app-health/application-view/infrastructure/mock/app-health-mock-application-view.repository';
import { AppHealthIApplicationViewRepository } from '@app/app-health/application-view/domain/app-health-application-view.repository';
import { AppHealthApplicationViewMapper } from '@app/app-health/application-view/domain/app-health-application-view.mapper';
import { AppHealthRawSQLApplicationViewsQueryHandler } from './app-health-raw-sql-application-views.query-handler';
import { AppHealthRawSQLApplicationViewsQuery } from './app-health-raw-sql-application-views.query';
import { AppHealthRawSQLApplicationViewsService } from './app-health-raw-sql-application-views.service';

describe('RawSQLApplicationViewsQueryHandler', () =>
{
    let queryHandler: AppHealthRawSQLApplicationViewsQueryHandler;
    let service: AppHealthRawSQLApplicationViewsService;
    let repository: AppHealthMockApplicationViewRepository;
    let mapper: AppHealthApplicationViewMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthRawSQLApplicationViewsQueryHandler,
                {
                    provide : AppHealthIApplicationViewRepository,
                    useClass: AppHealthMockApplicationViewRepository,
                },
                {
                    provide : AppHealthRawSQLApplicationViewsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthRawSQLApplicationViewsQueryHandler>(AppHealthRawSQLApplicationViewsQueryHandler);
        service = module.get<AppHealthRawSQLApplicationViewsService>(AppHealthRawSQLApplicationViewsService);
        repository = <AppHealthMockApplicationViewRepository>module.get<AppHealthIApplicationViewRepository>(AppHealthIApplicationViewRepository);
        mapper = new AppHealthApplicationViewMapper();
    });

    describe('main', () =>
    {
        test('AppHealthRawSQLApplicationViewsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an applicationViews founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new AppHealthRawSQLApplicationViewsQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
