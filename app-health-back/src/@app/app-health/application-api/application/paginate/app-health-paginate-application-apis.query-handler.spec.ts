import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResponse } from '@aurorajs.dev/core';

// custom items
import { AppHealthPaginateApplicationApisQueryHandler } from './app-health-paginate-application-apis.query-handler';
import { AppHealthMockApplicationApiRepository } from '@app/app-health/application-api/infrastructure/mock/app-health-mock-application-api.repository';
import { AppHealthIApplicationApiRepository } from '@app/app-health/application-api/domain/app-health-application-api.repository';
import { AppHealthApplicationApiMapper } from '@app/app-health/application-api/domain/app-health-application-api.mapper';
import { AppHealthPaginateApplicationApisQuery } from './app-health-paginate-application-apis.query';
import { AppHealthPaginateApplicationApisService } from './app-health-paginate-application-apis.service';

describe('AppHealthPaginateApplicationApisQueryHandler', () =>
{
    let queryHandler: AppHealthPaginateApplicationApisQueryHandler;
    let service: AppHealthPaginateApplicationApisService;
    let repository: AppHealthMockApplicationApiRepository;
    let mapper: AppHealthApplicationApiMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthPaginateApplicationApisQueryHandler,
                {
                    provide : AppHealthIApplicationApiRepository,
                    useClass: AppHealthMockApplicationApiRepository,
                },
                {
                    provide : AppHealthPaginateApplicationApisService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthPaginateApplicationApisQueryHandler>(AppHealthPaginateApplicationApisQueryHandler);
        service = module.get<AppHealthPaginateApplicationApisService>(AppHealthPaginateApplicationApisService);
        repository = <AppHealthMockApplicationApiRepository>module.get<AppHealthIApplicationApiRepository>(AppHealthIApplicationApiRepository);
        mapper = new AppHealthApplicationApiMapper();
    });

    describe('main', () =>
    {
        test('AppHealthPaginateApplicationApisQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an applicationApis paginated', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows : repository.collectionSource.slice(0,10),
                },
            )));
            expect(await queryHandler.execute(
                new AppHealthPaginateApplicationApisQuery(
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
