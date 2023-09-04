import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthMockDatabaseRepository } from '@app/app-health/database/infrastructure/mock/app-health-mock-database.repository';
import { AppHealthIDatabaseRepository } from '@app/app-health/database/domain/app-health-database.repository';
import { AppHealthDatabaseMapper } from '@app/app-health/database/domain/app-health-database.mapper';
import { AppHealthRawSQLDatabasesQueryHandler } from './app-health-raw-sql-databases.query-handler';
import { AppHealthRawSQLDatabasesQuery } from './app-health-raw-sql-databases.query';
import { AppHealthRawSQLDatabasesService } from './app-health-raw-sql-databases.service';

describe('RawSQLDatabasesQueryHandler', () =>
{
    let queryHandler: AppHealthRawSQLDatabasesQueryHandler;
    let service: AppHealthRawSQLDatabasesService;
    let repository: AppHealthMockDatabaseRepository;
    let mapper: AppHealthDatabaseMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthRawSQLDatabasesQueryHandler,
                {
                    provide : AppHealthIDatabaseRepository,
                    useClass: AppHealthMockDatabaseRepository,
                },
                {
                    provide : AppHealthRawSQLDatabasesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthRawSQLDatabasesQueryHandler>(AppHealthRawSQLDatabasesQueryHandler);
        service = module.get<AppHealthRawSQLDatabasesService>(AppHealthRawSQLDatabasesService);
        repository = <AppHealthMockDatabaseRepository>module.get<AppHealthIDatabaseRepository>(AppHealthIDatabaseRepository);
        mapper = new AppHealthDatabaseMapper();
    });

    describe('main', () =>
    {
        test('AppHealthRawSQLDatabasesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an databases founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new AppHealthRawSQLDatabasesQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
