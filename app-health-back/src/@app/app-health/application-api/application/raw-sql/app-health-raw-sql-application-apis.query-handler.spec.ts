import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthMockApplicationApiRepository } from '@app/app-health/application-api/infrastructure/mock/app-health-mock-application-api.repository';
import { AppHealthIApplicationApiRepository } from '@app/app-health/application-api/domain/app-health-application-api.repository';
import { AppHealthApplicationApiMapper } from '@app/app-health/application-api/domain/app-health-application-api.mapper';
import { AppHealthRawSQLApplicationApisQueryHandler } from './app-health-raw-sql-application-apis.query-handler';
import { AppHealthRawSQLApplicationApisQuery } from './app-health-raw-sql-application-apis.query';
import { AppHealthRawSQLApplicationApisService } from './app-health-raw-sql-application-apis.service';

describe('RawSQLApplicationApisQueryHandler', () =>
{
    let queryHandler: AppHealthRawSQLApplicationApisQueryHandler;
    let service: AppHealthRawSQLApplicationApisService;
    let repository: AppHealthMockApplicationApiRepository;
    let mapper: AppHealthApplicationApiMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthRawSQLApplicationApisQueryHandler,
                {
                    provide : AppHealthIApplicationApiRepository,
                    useClass: AppHealthMockApplicationApiRepository,
                },
                {
                    provide : AppHealthRawSQLApplicationApisService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthRawSQLApplicationApisQueryHandler>(AppHealthRawSQLApplicationApisQueryHandler);
        service = module.get<AppHealthRawSQLApplicationApisService>(AppHealthRawSQLApplicationApisService);
        repository = <AppHealthMockApplicationApiRepository>module.get<AppHealthIApplicationApiRepository>(AppHealthIApplicationApiRepository);
        mapper = new AppHealthApplicationApiMapper();
    });

    describe('main', () =>
    {
        test('AppHealthRawSQLApplicationApisQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an applicationApis founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new AppHealthRawSQLApplicationApisQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
