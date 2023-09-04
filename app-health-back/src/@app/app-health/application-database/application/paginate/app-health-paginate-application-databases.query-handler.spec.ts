import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResponse } from '@aurorajs.dev/core';

// custom items
import { AppHealthPaginateApplicationDatabasesQueryHandler } from './app-health-paginate-application-databases.query-handler';
import { AppHealthMockApplicationDatabaseRepository } from '@app/app-health/application-database/infrastructure/mock/app-health-mock-application-database.repository';
import { AppHealthIApplicationDatabaseRepository } from '@app/app-health/application-database/domain/app-health-application-database.repository';
import { AppHealthApplicationDatabaseMapper } from '@app/app-health/application-database/domain/app-health-application-database.mapper';
import { AppHealthPaginateApplicationDatabasesQuery } from './app-health-paginate-application-databases.query';
import { AppHealthPaginateApplicationDatabasesService } from './app-health-paginate-application-databases.service';

describe('AppHealthPaginateApplicationDatabasesQueryHandler', () =>
{
    let queryHandler: AppHealthPaginateApplicationDatabasesQueryHandler;
    let service: AppHealthPaginateApplicationDatabasesService;
    let repository: AppHealthMockApplicationDatabaseRepository;
    let mapper: AppHealthApplicationDatabaseMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthPaginateApplicationDatabasesQueryHandler,
                {
                    provide : AppHealthIApplicationDatabaseRepository,
                    useClass: AppHealthMockApplicationDatabaseRepository,
                },
                {
                    provide : AppHealthPaginateApplicationDatabasesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthPaginateApplicationDatabasesQueryHandler>(AppHealthPaginateApplicationDatabasesQueryHandler);
        service = module.get<AppHealthPaginateApplicationDatabasesService>(AppHealthPaginateApplicationDatabasesService);
        repository = <AppHealthMockApplicationDatabaseRepository>module.get<AppHealthIApplicationDatabaseRepository>(AppHealthIApplicationDatabaseRepository);
        mapper = new AppHealthApplicationDatabaseMapper();
    });

    describe('main', () =>
    {
        test('AppHealthPaginateApplicationDatabasesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an applicationDatabases paginated', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows : repository.collectionSource.slice(0,10),
                },
            )));
            expect(await queryHandler.execute(
                new AppHealthPaginateApplicationDatabasesQuery(
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
