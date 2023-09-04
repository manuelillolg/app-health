import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResponse } from '@aurorajs.dev/core';

// custom items
import { AppHealthPaginateApplicationAuthorizationsQueryHandler } from './app-health-paginate-application-authorizations.query-handler';
import { AppHealthMockApplicationAuthorizationRepository } from '@app/app-health/application-authorization/infrastructure/mock/app-health-mock-application-authorization.repository';
import { AppHealthIApplicationAuthorizationRepository } from '@app/app-health/application-authorization/domain/app-health-application-authorization.repository';
import { AppHealthApplicationAuthorizationMapper } from '@app/app-health/application-authorization/domain/app-health-application-authorization.mapper';
import { AppHealthPaginateApplicationAuthorizationsQuery } from './app-health-paginate-application-authorizations.query';
import { AppHealthPaginateApplicationAuthorizationsService } from './app-health-paginate-application-authorizations.service';

describe('AppHealthPaginateApplicationAuthorizationsQueryHandler', () =>
{
    let queryHandler: AppHealthPaginateApplicationAuthorizationsQueryHandler;
    let service: AppHealthPaginateApplicationAuthorizationsService;
    let repository: AppHealthMockApplicationAuthorizationRepository;
    let mapper: AppHealthApplicationAuthorizationMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthPaginateApplicationAuthorizationsQueryHandler,
                {
                    provide : AppHealthIApplicationAuthorizationRepository,
                    useClass: AppHealthMockApplicationAuthorizationRepository,
                },
                {
                    provide : AppHealthPaginateApplicationAuthorizationsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthPaginateApplicationAuthorizationsQueryHandler>(AppHealthPaginateApplicationAuthorizationsQueryHandler);
        service = module.get<AppHealthPaginateApplicationAuthorizationsService>(AppHealthPaginateApplicationAuthorizationsService);
        repository = <AppHealthMockApplicationAuthorizationRepository>module.get<AppHealthIApplicationAuthorizationRepository>(AppHealthIApplicationAuthorizationRepository);
        mapper = new AppHealthApplicationAuthorizationMapper();
    });

    describe('main', () =>
    {
        test('AppHealthPaginateApplicationAuthorizationsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an applicationAuthorizations paginated', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows : repository.collectionSource.slice(0,10),
                },
            )));
            expect(await queryHandler.execute(
                new AppHealthPaginateApplicationAuthorizationsQuery(
                    {
                        offset: 0,
                        limit : 10,
                    },
                ),
            )).toStrictEqual(
                new PaginationResponse(
                    100,
                    10,
                    repository.collectionSource.slice(0,10).map(item => item.toDTO()),
                ),
            );
        });
    });
});
