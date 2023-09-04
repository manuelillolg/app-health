import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthFindApplicationAuthorizationByIdQueryHandler } from './app-health-find-application-authorization-by-id.query-handler';
import { AppHealthMockApplicationAuthorizationRepository } from '@app/app-health/application-authorization/infrastructure/mock/app-health-mock-application-authorization.repository';
import { appHealthMockApplicationAuthorizationData } from '@app/app-health/application-authorization/infrastructure/mock/app-health-mock-application-authorization.data';
import { AppHealthIApplicationAuthorizationRepository } from '@app/app-health/application-authorization/domain/app-health-application-authorization.repository';
import { AppHealthApplicationAuthorizationMapper } from '@app/app-health/application-authorization/domain/app-health-application-authorization.mapper';
import { AppHealthFindApplicationAuthorizationByIdQuery } from './app-health-find-application-authorization-by-id.query';
import { AppHealthFindApplicationAuthorizationByIdService } from './app-health-find-application-authorization-by-id.service';

describe('AppHealthFindApplicationAuthorizationByIdQueryHandler', () =>
{
    let queryHandler: AppHealthFindApplicationAuthorizationByIdQueryHandler;
    let service: AppHealthFindApplicationAuthorizationByIdService;
    let repository: AppHealthMockApplicationAuthorizationRepository;
    let mapper: AppHealthApplicationAuthorizationMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthFindApplicationAuthorizationByIdQueryHandler,
                {
                    provide : AppHealthIApplicationAuthorizationRepository,
                    useClass: AppHealthMockApplicationAuthorizationRepository,
                },
                {
                    provide : AppHealthFindApplicationAuthorizationByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthFindApplicationAuthorizationByIdQueryHandler>(AppHealthFindApplicationAuthorizationByIdQueryHandler);
        service = module.get<AppHealthFindApplicationAuthorizationByIdService>(AppHealthFindApplicationAuthorizationByIdService);
        repository = <AppHealthMockApplicationAuthorizationRepository>module.get<AppHealthIApplicationAuthorizationRepository>(AppHealthIApplicationAuthorizationRepository);
        mapper = new AppHealthApplicationAuthorizationMapper();
    });

    describe('main', () =>
    {
        test('FindApplicationAuthorizationByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an applicationAuthorization founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new AppHealthFindApplicationAuthorizationByIdQuery(
                    appHealthMockApplicationAuthorizationData[0].id,

                ),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
