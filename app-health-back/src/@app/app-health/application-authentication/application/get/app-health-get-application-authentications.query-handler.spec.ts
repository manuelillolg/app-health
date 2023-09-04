import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthGetApplicationAuthenticationsQueryHandler } from './app-health-get-application-authentications.query-handler';
import { AppHealthMockApplicationAuthenticationRepository } from '@app/app-health/application-authentication/infrastructure/mock/app-health-mock-application-authentication.repository';
import { AppHealthIApplicationAuthenticationRepository } from '@app/app-health/application-authentication/domain/app-health-application-authentication.repository';
import { AppHealthApplicationAuthenticationMapper } from '@app/app-health/application-authentication/domain/app-health-application-authentication.mapper';
import { AppHealthGetApplicationAuthenticationsQuery } from './app-health-get-application-authentications.query';
import { AppHealthGetApplicationAuthenticationsService } from './app-health-get-application-authentications.service';

describe('GetApplicationAuthenticationsQueryHandler', () =>
{
    let queryHandler: AppHealthGetApplicationAuthenticationsQueryHandler;
    let service: AppHealthGetApplicationAuthenticationsService;
    let repository: AppHealthMockApplicationAuthenticationRepository;
    let mapper: AppHealthApplicationAuthenticationMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthGetApplicationAuthenticationsQueryHandler,
                {
                    provide : AppHealthIApplicationAuthenticationRepository,
                    useClass: AppHealthMockApplicationAuthenticationRepository,
                },
                {
                    provide : AppHealthGetApplicationAuthenticationsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthGetApplicationAuthenticationsQueryHandler>(AppHealthGetApplicationAuthenticationsQueryHandler);
        service = module.get<AppHealthGetApplicationAuthenticationsService>(AppHealthGetApplicationAuthenticationsService);
        repository = <AppHealthMockApplicationAuthenticationRepository>module.get<AppHealthIApplicationAuthenticationRepository>(AppHealthIApplicationAuthenticationRepository);
        mapper = new AppHealthApplicationAuthenticationMapper();
    });

    describe('main', () =>
    {
        test('AppHealthGetApplicationAuthenticationsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an applicationAuthentications founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new AppHealthGetApplicationAuthenticationsQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});