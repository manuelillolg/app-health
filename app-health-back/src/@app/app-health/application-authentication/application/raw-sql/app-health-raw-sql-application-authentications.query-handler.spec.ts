import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthMockApplicationAuthenticationRepository } from '@app/app-health/application-authentication/infrastructure/mock/app-health-mock-application-authentication.repository';
import { AppHealthIApplicationAuthenticationRepository } from '@app/app-health/application-authentication/domain/app-health-application-authentication.repository';
import { AppHealthApplicationAuthenticationMapper } from '@app/app-health/application-authentication/domain/app-health-application-authentication.mapper';
import { AppHealthRawSQLApplicationAuthenticationsQueryHandler } from './app-health-raw-sql-application-authentications.query-handler';
import { AppHealthRawSQLApplicationAuthenticationsQuery } from './app-health-raw-sql-application-authentications.query';
import { AppHealthRawSQLApplicationAuthenticationsService } from './app-health-raw-sql-application-authentications.service';

describe('RawSQLApplicationAuthenticationsQueryHandler', () =>
{
    let queryHandler: AppHealthRawSQLApplicationAuthenticationsQueryHandler;
    let service: AppHealthRawSQLApplicationAuthenticationsService;
    let repository: AppHealthMockApplicationAuthenticationRepository;
    let mapper: AppHealthApplicationAuthenticationMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthRawSQLApplicationAuthenticationsQueryHandler,
                {
                    provide : AppHealthIApplicationAuthenticationRepository,
                    useClass: AppHealthMockApplicationAuthenticationRepository,
                },
                {
                    provide : AppHealthRawSQLApplicationAuthenticationsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthRawSQLApplicationAuthenticationsQueryHandler>(AppHealthRawSQLApplicationAuthenticationsQueryHandler);
        service = module.get<AppHealthRawSQLApplicationAuthenticationsService>(AppHealthRawSQLApplicationAuthenticationsService);
        repository = <AppHealthMockApplicationAuthenticationRepository>module.get<AppHealthIApplicationAuthenticationRepository>(AppHealthIApplicationAuthenticationRepository);
        mapper = new AppHealthApplicationAuthenticationMapper();
    });

    describe('main', () =>
    {
        test('AppHealthRawSQLApplicationAuthenticationsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an applicationAuthentications founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new AppHealthRawSQLApplicationAuthenticationsQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
