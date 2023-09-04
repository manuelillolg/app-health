import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthGetApplicationAuthorizationsQueryHandler } from './app-health-get-application-authorizations.query-handler';
import { AppHealthMockApplicationAuthorizationRepository } from '@app/app-health/application-authorization/infrastructure/mock/app-health-mock-application-authorization.repository';
import { AppHealthIApplicationAuthorizationRepository } from '@app/app-health/application-authorization/domain/app-health-application-authorization.repository';
import { AppHealthApplicationAuthorizationMapper } from '@app/app-health/application-authorization/domain/app-health-application-authorization.mapper';
import { AppHealthGetApplicationAuthorizationsQuery } from './app-health-get-application-authorizations.query';
import { AppHealthGetApplicationAuthorizationsService } from './app-health-get-application-authorizations.service';

describe('GetApplicationAuthorizationsQueryHandler', () =>
{
    let queryHandler: AppHealthGetApplicationAuthorizationsQueryHandler;
    let service: AppHealthGetApplicationAuthorizationsService;
    let repository: AppHealthMockApplicationAuthorizationRepository;
    let mapper: AppHealthApplicationAuthorizationMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthGetApplicationAuthorizationsQueryHandler,
                {
                    provide : AppHealthIApplicationAuthorizationRepository,
                    useClass: AppHealthMockApplicationAuthorizationRepository,
                },
                {
                    provide : AppHealthGetApplicationAuthorizationsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthGetApplicationAuthorizationsQueryHandler>(AppHealthGetApplicationAuthorizationsQueryHandler);
        service = module.get<AppHealthGetApplicationAuthorizationsService>(AppHealthGetApplicationAuthorizationsService);
        repository = <AppHealthMockApplicationAuthorizationRepository>module.get<AppHealthIApplicationAuthorizationRepository>(AppHealthIApplicationAuthorizationRepository);
        mapper = new AppHealthApplicationAuthorizationMapper();
    });

    describe('main', () =>
    {
        test('AppHealthGetApplicationAuthorizationsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an applicationAuthorizations founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new AppHealthGetApplicationAuthorizationsQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});