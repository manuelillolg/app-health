import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthGetApplicationDatabasesQueryHandler } from './app-health-get-application-databases.query-handler';
import { AppHealthMockApplicationDatabaseRepository } from '@app/app-health/application-database/infrastructure/mock/app-health-mock-application-database.repository';
import { AppHealthIApplicationDatabaseRepository } from '@app/app-health/application-database/domain/app-health-application-database.repository';
import { AppHealthApplicationDatabaseMapper } from '@app/app-health/application-database/domain/app-health-application-database.mapper';
import { AppHealthGetApplicationDatabasesQuery } from './app-health-get-application-databases.query';
import { AppHealthGetApplicationDatabasesService } from './app-health-get-application-databases.service';

describe('GetApplicationDatabasesQueryHandler', () =>
{
    let queryHandler: AppHealthGetApplicationDatabasesQueryHandler;
    let service: AppHealthGetApplicationDatabasesService;
    let repository: AppHealthMockApplicationDatabaseRepository;
    let mapper: AppHealthApplicationDatabaseMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthGetApplicationDatabasesQueryHandler,
                {
                    provide : AppHealthIApplicationDatabaseRepository,
                    useClass: AppHealthMockApplicationDatabaseRepository,
                },
                {
                    provide : AppHealthGetApplicationDatabasesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthGetApplicationDatabasesQueryHandler>(AppHealthGetApplicationDatabasesQueryHandler);
        service = module.get<AppHealthGetApplicationDatabasesService>(AppHealthGetApplicationDatabasesService);
        repository = <AppHealthMockApplicationDatabaseRepository>module.get<AppHealthIApplicationDatabaseRepository>(AppHealthIApplicationDatabaseRepository);
        mapper = new AppHealthApplicationDatabaseMapper();
    });

    describe('main', () =>
    {
        test('AppHealthGetApplicationDatabasesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an applicationDatabases founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new AppHealthGetApplicationDatabasesQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});