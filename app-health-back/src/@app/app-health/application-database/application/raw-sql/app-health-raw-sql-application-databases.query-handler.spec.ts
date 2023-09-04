import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthMockApplicationDatabaseRepository } from '@app/app-health/application-database/infrastructure/mock/app-health-mock-application-database.repository';
import { AppHealthIApplicationDatabaseRepository } from '@app/app-health/application-database/domain/app-health-application-database.repository';
import { AppHealthApplicationDatabaseMapper } from '@app/app-health/application-database/domain/app-health-application-database.mapper';
import { AppHealthRawSQLApplicationDatabasesQueryHandler } from './app-health-raw-sql-application-databases.query-handler';
import { AppHealthRawSQLApplicationDatabasesQuery } from './app-health-raw-sql-application-databases.query';
import { AppHealthRawSQLApplicationDatabasesService } from './app-health-raw-sql-application-databases.service';

describe('RawSQLApplicationDatabasesQueryHandler', () =>
{
    let queryHandler: AppHealthRawSQLApplicationDatabasesQueryHandler;
    let service: AppHealthRawSQLApplicationDatabasesService;
    let repository: AppHealthMockApplicationDatabaseRepository;
    let mapper: AppHealthApplicationDatabaseMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthRawSQLApplicationDatabasesQueryHandler,
                {
                    provide : AppHealthIApplicationDatabaseRepository,
                    useClass: AppHealthMockApplicationDatabaseRepository,
                },
                {
                    provide : AppHealthRawSQLApplicationDatabasesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthRawSQLApplicationDatabasesQueryHandler>(AppHealthRawSQLApplicationDatabasesQueryHandler);
        service = module.get<AppHealthRawSQLApplicationDatabasesService>(AppHealthRawSQLApplicationDatabasesService);
        repository = <AppHealthMockApplicationDatabaseRepository>module.get<AppHealthIApplicationDatabaseRepository>(AppHealthIApplicationDatabaseRepository);
        mapper = new AppHealthApplicationDatabaseMapper();
    });

    describe('main', () =>
    {
        test('AppHealthRawSQLApplicationDatabasesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an applicationDatabases founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new AppHealthRawSQLApplicationDatabasesQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
