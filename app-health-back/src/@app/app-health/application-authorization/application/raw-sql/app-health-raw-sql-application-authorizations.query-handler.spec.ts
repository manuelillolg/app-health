import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthMockApplicationAuthorizationRepository } from '@app/app-health/application-authorization/infrastructure/mock/app-health-mock-application-authorization.repository';
import { AppHealthIApplicationAuthorizationRepository } from '@app/app-health/application-authorization/domain/app-health-application-authorization.repository';
import { AppHealthApplicationAuthorizationMapper } from '@app/app-health/application-authorization/domain/app-health-application-authorization.mapper';
import { AppHealthRawSQLApplicationAuthorizationsQueryHandler } from './app-health-raw-sql-application-authorizations.query-handler';
import { AppHealthRawSQLApplicationAuthorizationsQuery } from './app-health-raw-sql-application-authorizations.query';
import { AppHealthRawSQLApplicationAuthorizationsService } from './app-health-raw-sql-application-authorizations.service';

describe('RawSQLApplicationAuthorizationsQueryHandler', () =>
{
    let queryHandler: AppHealthRawSQLApplicationAuthorizationsQueryHandler;
    let service: AppHealthRawSQLApplicationAuthorizationsService;
    let repository: AppHealthMockApplicationAuthorizationRepository;
    let mapper: AppHealthApplicationAuthorizationMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthRawSQLApplicationAuthorizationsQueryHandler,
                {
                    provide : AppHealthIApplicationAuthorizationRepository,
                    useClass: AppHealthMockApplicationAuthorizationRepository,
                },
                {
                    provide : AppHealthRawSQLApplicationAuthorizationsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthRawSQLApplicationAuthorizationsQueryHandler>(AppHealthRawSQLApplicationAuthorizationsQueryHandler);
        service = module.get<AppHealthRawSQLApplicationAuthorizationsService>(AppHealthRawSQLApplicationAuthorizationsService);
        repository = <AppHealthMockApplicationAuthorizationRepository>module.get<AppHealthIApplicationAuthorizationRepository>(AppHealthIApplicationAuthorizationRepository);
        mapper = new AppHealthApplicationAuthorizationMapper();
    });

    describe('main', () =>
    {
        test('AppHealthRawSQLApplicationAuthorizationsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an applicationAuthorizations founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new AppHealthRawSQLApplicationAuthorizationsQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
