import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthFindApplicationAuthenticationQueryHandler } from './app-health-find-application-authentication.query-handler';
import { AppHealthMockApplicationAuthenticationRepository } from '@app/app-health/application-authentication/infrastructure/mock/app-health-mock-application-authentication.repository';
import { AppHealthIApplicationAuthenticationRepository } from '@app/app-health/application-authentication/domain/app-health-application-authentication.repository';
import { AppHealthApplicationAuthenticationMapper } from '@app/app-health/application-authentication/domain/app-health-application-authentication.mapper';
import { AppHealthFindApplicationAuthenticationQuery } from './app-health-find-application-authentication.query';
import { AppHealthFindApplicationAuthenticationService } from './app-health-find-application-authentication.service';

describe('AppHealthFindApplicationAuthenticationQueryHandler', () =>
{
    let queryHandler: AppHealthFindApplicationAuthenticationQueryHandler;
    let service: AppHealthFindApplicationAuthenticationService;
    let repository: AppHealthMockApplicationAuthenticationRepository;
    let mapper: AppHealthApplicationAuthenticationMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthFindApplicationAuthenticationQueryHandler,
                {
                    provide : AppHealthIApplicationAuthenticationRepository,
                    useClass: AppHealthMockApplicationAuthenticationRepository,
                },
                {
                    provide : AppHealthFindApplicationAuthenticationService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthFindApplicationAuthenticationQueryHandler>(AppHealthFindApplicationAuthenticationQueryHandler);
        service = module.get<AppHealthFindApplicationAuthenticationService>(AppHealthFindApplicationAuthenticationService);
        repository = <AppHealthMockApplicationAuthenticationRepository>module.get<AppHealthIApplicationAuthenticationRepository>(AppHealthIApplicationAuthenticationRepository);
        mapper = new AppHealthApplicationAuthenticationMapper();
    });

    describe('main', () =>
    {
        test('AppHealthFindApplicationAuthenticationQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an applicationAuthentication founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new AppHealthFindApplicationAuthenticationQuery(),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
