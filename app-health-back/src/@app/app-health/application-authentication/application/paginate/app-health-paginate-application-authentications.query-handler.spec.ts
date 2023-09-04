import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResponse } from '@aurorajs.dev/core';

// custom items
import { AppHealthPaginateApplicationAuthenticationsQueryHandler } from './app-health-paginate-application-authentications.query-handler';
import { AppHealthMockApplicationAuthenticationRepository } from '@app/app-health/application-authentication/infrastructure/mock/app-health-mock-application-authentication.repository';
import { AppHealthIApplicationAuthenticationRepository } from '@app/app-health/application-authentication/domain/app-health-application-authentication.repository';
import { AppHealthApplicationAuthenticationMapper } from '@app/app-health/application-authentication/domain/app-health-application-authentication.mapper';
import { AppHealthPaginateApplicationAuthenticationsQuery } from './app-health-paginate-application-authentications.query';
import { AppHealthPaginateApplicationAuthenticationsService } from './app-health-paginate-application-authentications.service';

describe('AppHealthPaginateApplicationAuthenticationsQueryHandler', () =>
{
    let queryHandler: AppHealthPaginateApplicationAuthenticationsQueryHandler;
    let service: AppHealthPaginateApplicationAuthenticationsService;
    let repository: AppHealthMockApplicationAuthenticationRepository;
    let mapper: AppHealthApplicationAuthenticationMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthPaginateApplicationAuthenticationsQueryHandler,
                {
                    provide : AppHealthIApplicationAuthenticationRepository,
                    useClass: AppHealthMockApplicationAuthenticationRepository,
                },
                {
                    provide : AppHealthPaginateApplicationAuthenticationsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthPaginateApplicationAuthenticationsQueryHandler>(AppHealthPaginateApplicationAuthenticationsQueryHandler);
        service = module.get<AppHealthPaginateApplicationAuthenticationsService>(AppHealthPaginateApplicationAuthenticationsService);
        repository = <AppHealthMockApplicationAuthenticationRepository>module.get<AppHealthIApplicationAuthenticationRepository>(AppHealthIApplicationAuthenticationRepository);
        mapper = new AppHealthApplicationAuthenticationMapper();
    });

    describe('main', () =>
    {
        test('AppHealthPaginateApplicationAuthenticationsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an applicationAuthentications paginated', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows : repository.collectionSource.slice(0,10),
                },
            )));
            expect(await queryHandler.execute(
                new AppHealthPaginateApplicationAuthenticationsQuery(
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
