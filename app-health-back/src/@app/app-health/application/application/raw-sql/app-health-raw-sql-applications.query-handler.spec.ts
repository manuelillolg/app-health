import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthMockApplicationRepository } from '@app/app-health/application/infrastructure/mock/app-health-mock-application.repository';
import { AppHealthIApplicationRepository } from '@app/app-health/application/domain/app-health-application.repository';
import { AppHealthApplicationMapper } from '@app/app-health/application/domain/app-health-application.mapper';
import { AppHealthRawSQLApplicationsQueryHandler } from './app-health-raw-sql-applications.query-handler';
import { AppHealthRawSQLApplicationsQuery } from './app-health-raw-sql-applications.query';
import { AppHealthRawSQLApplicationsService } from './app-health-raw-sql-applications.service';

describe('RawSQLApplicationsQueryHandler', () =>
{
    let queryHandler: AppHealthRawSQLApplicationsQueryHandler;
    let service: AppHealthRawSQLApplicationsService;
    let repository: AppHealthMockApplicationRepository;
    let mapper: AppHealthApplicationMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthRawSQLApplicationsQueryHandler,
                {
                    provide : AppHealthIApplicationRepository,
                    useClass: AppHealthMockApplicationRepository,
                },
                {
                    provide : AppHealthRawSQLApplicationsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthRawSQLApplicationsQueryHandler>(AppHealthRawSQLApplicationsQueryHandler);
        service = module.get<AppHealthRawSQLApplicationsService>(AppHealthRawSQLApplicationsService);
        repository = <AppHealthMockApplicationRepository>module.get<AppHealthIApplicationRepository>(AppHealthIApplicationRepository);
        mapper = new AppHealthApplicationMapper();
    });

    describe('main', () =>
    {
        test('AppHealthRawSQLApplicationsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an applications founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new AppHealthRawSQLApplicationsQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
