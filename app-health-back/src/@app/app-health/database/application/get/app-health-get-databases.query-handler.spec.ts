import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthGetDatabasesQueryHandler } from './app-health-get-databases.query-handler';
import { AppHealthMockDatabaseRepository } from '@app/app-health/database/infrastructure/mock/app-health-mock-database.repository';
import { AppHealthIDatabaseRepository } from '@app/app-health/database/domain/app-health-database.repository';
import { AppHealthDatabaseMapper } from '@app/app-health/database/domain/app-health-database.mapper';
import { AppHealthGetDatabasesQuery } from './app-health-get-databases.query';
import { AppHealthGetDatabasesService } from './app-health-get-databases.service';

describe('GetDatabasesQueryHandler', () =>
{
    let queryHandler: AppHealthGetDatabasesQueryHandler;
    let service: AppHealthGetDatabasesService;
    let repository: AppHealthMockDatabaseRepository;
    let mapper: AppHealthDatabaseMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthGetDatabasesQueryHandler,
                {
                    provide : AppHealthIDatabaseRepository,
                    useClass: AppHealthMockDatabaseRepository,
                },
                {
                    provide : AppHealthGetDatabasesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthGetDatabasesQueryHandler>(AppHealthGetDatabasesQueryHandler);
        service = module.get<AppHealthGetDatabasesService>(AppHealthGetDatabasesService);
        repository = <AppHealthMockDatabaseRepository>module.get<AppHealthIDatabaseRepository>(AppHealthIDatabaseRepository);
        mapper = new AppHealthDatabaseMapper();
    });

    describe('main', () =>
    {
        test('AppHealthGetDatabasesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an databases founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new AppHealthGetDatabasesQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});