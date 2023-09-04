import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthFindApplicationAuthorizationQueryHandler } from './app-health-find-application-authorization.query-handler';
import { AppHealthMockApplicationAuthorizationRepository } from '@app/app-health/application-authorization/infrastructure/mock/app-health-mock-application-authorization.repository';
import { AppHealthIApplicationAuthorizationRepository } from '@app/app-health/application-authorization/domain/app-health-application-authorization.repository';
import { AppHealthApplicationAuthorizationMapper } from '@app/app-health/application-authorization/domain/app-health-application-authorization.mapper';
import { AppHealthFindApplicationAuthorizationQuery } from './app-health-find-application-authorization.query';
import { AppHealthFindApplicationAuthorizationService } from './app-health-find-application-authorization.service';

describe('AppHealthFindApplicationAuthorizationQueryHandler', () =>
{
    let queryHandler: AppHealthFindApplicationAuthorizationQueryHandler;
    let service: AppHealthFindApplicationAuthorizationService;
    let repository: AppHealthMockApplicationAuthorizationRepository;
    let mapper: AppHealthApplicationAuthorizationMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthFindApplicationAuthorizationQueryHandler,
                {
                    provide : AppHealthIApplicationAuthorizationRepository,
                    useClass: AppHealthMockApplicationAuthorizationRepository,
                },
                {
                    provide : AppHealthFindApplicationAuthorizationService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthFindApplicationAuthorizationQueryHandler>(AppHealthFindApplicationAuthorizationQueryHandler);
        service = module.get<AppHealthFindApplicationAuthorizationService>(AppHealthFindApplicationAuthorizationService);
        repository = <AppHealthMockApplicationAuthorizationRepository>module.get<AppHealthIApplicationAuthorizationRepository>(AppHealthIApplicationAuthorizationRepository);
        mapper = new AppHealthApplicationAuthorizationMapper();
    });

    describe('main', () =>
    {
        test('AppHealthFindApplicationAuthorizationQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an applicationAuthorization founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new AppHealthFindApplicationAuthorizationQuery(),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
