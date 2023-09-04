import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResponse } from '@aurorajs.dev/core';

// custom items
import { AppHealthPaginateDatabasesQueryHandler } from './app-health-paginate-databases.query-handler';
import { AppHealthMockDatabaseRepository } from '@app/app-health/database/infrastructure/mock/app-health-mock-database.repository';
import { AppHealthIDatabaseRepository } from '@app/app-health/database/domain/app-health-database.repository';
import { AppHealthDatabaseMapper } from '@app/app-health/database/domain/app-health-database.mapper';
import { AppHealthPaginateDatabasesQuery } from './app-health-paginate-databases.query';
import { AppHealthPaginateDatabasesService } from './app-health-paginate-databases.service';

describe('AppHealthPaginateDatabasesQueryHandler', () =>
{
    let queryHandler: AppHealthPaginateDatabasesQueryHandler;
    let service: AppHealthPaginateDatabasesService;
    let repository: AppHealthMockDatabaseRepository;
    let mapper: AppHealthDatabaseMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthPaginateDatabasesQueryHandler,
                {
                    provide : AppHealthIDatabaseRepository,
                    useClass: AppHealthMockDatabaseRepository,
                },
                {
                    provide : AppHealthPaginateDatabasesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthPaginateDatabasesQueryHandler>(AppHealthPaginateDatabasesQueryHandler);
        service = module.get<AppHealthPaginateDatabasesService>(AppHealthPaginateDatabasesService);
        repository = <AppHealthMockDatabaseRepository>module.get<AppHealthIDatabaseRepository>(AppHealthIDatabaseRepository);
        mapper = new AppHealthDatabaseMapper();
    });

    describe('main', () =>
    {
        test('AppHealthPaginateDatabasesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an databases paginated', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows : repository.collectionSource.slice(0,10),
                },
            )));
            expect(await queryHandler.execute(
                new AppHealthPaginateDatabasesQuery(
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
