import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthFindApplicationAuthenticationByIdQueryHandler } from './app-health-find-application-authentication-by-id.query-handler';
import { AppHealthMockApplicationAuthenticationRepository } from '@app/app-health/application-authentication/infrastructure/mock/app-health-mock-application-authentication.repository';
import { appHealthMockApplicationAuthenticationData } from '@app/app-health/application-authentication/infrastructure/mock/app-health-mock-application-authentication.data';
import { AppHealthIApplicationAuthenticationRepository } from '@app/app-health/application-authentication/domain/app-health-application-authentication.repository';
import { AppHealthApplicationAuthenticationMapper } from '@app/app-health/application-authentication/domain/app-health-application-authentication.mapper';
import { AppHealthFindApplicationAuthenticationByIdQuery } from './app-health-find-application-authentication-by-id.query';
import { AppHealthFindApplicationAuthenticationByIdService } from './app-health-find-application-authentication-by-id.service';

describe('AppHealthFindApplicationAuthenticationByIdQueryHandler', () =>
{
    let queryHandler: AppHealthFindApplicationAuthenticationByIdQueryHandler;
    let service: AppHealthFindApplicationAuthenticationByIdService;
    let repository: AppHealthMockApplicationAuthenticationRepository;
    let mapper: AppHealthApplicationAuthenticationMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthFindApplicationAuthenticationByIdQueryHandler,
                {
                    provide : AppHealthIApplicationAuthenticationRepository,
                    useClass: AppHealthMockApplicationAuthenticationRepository,
                },
                {
                    provide : AppHealthFindApplicationAuthenticationByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthFindApplicationAuthenticationByIdQueryHandler>(AppHealthFindApplicationAuthenticationByIdQueryHandler);
        service = module.get<AppHealthFindApplicationAuthenticationByIdService>(AppHealthFindApplicationAuthenticationByIdService);
        repository = <AppHealthMockApplicationAuthenticationRepository>module.get<AppHealthIApplicationAuthenticationRepository>(AppHealthIApplicationAuthenticationRepository);
        mapper = new AppHealthApplicationAuthenticationMapper();
    });

    describe('main', () =>
    {
        test('FindApplicationAuthenticationByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an applicationAuthentication founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new AppHealthFindApplicationAuthenticationByIdQuery(
                    appHealthMockApplicationAuthenticationData[0].id,

                ),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
