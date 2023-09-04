import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResponse } from '@aurorajs.dev/core';

// custom items
import { AppHealthPaginateApplicationsQueryHandler } from './app-health-paginate-applications.query-handler';
import { AppHealthMockApplicationRepository } from '@app/app-health/application/infrastructure/mock/app-health-mock-application.repository';
import { AppHealthIApplicationRepository } from '@app/app-health/application/domain/app-health-application.repository';
import { AppHealthApplicationMapper } from '@app/app-health/application/domain/app-health-application.mapper';
import { AppHealthPaginateApplicationsQuery } from './app-health-paginate-applications.query';
import { AppHealthPaginateApplicationsService } from './app-health-paginate-applications.service';

describe('AppHealthPaginateApplicationsQueryHandler', () =>
{
    let queryHandler: AppHealthPaginateApplicationsQueryHandler;
    let service: AppHealthPaginateApplicationsService;
    let repository: AppHealthMockApplicationRepository;
    let mapper: AppHealthApplicationMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthPaginateApplicationsQueryHandler,
                {
                    provide : AppHealthIApplicationRepository,
                    useClass: AppHealthMockApplicationRepository,
                },
                {
                    provide : AppHealthPaginateApplicationsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthPaginateApplicationsQueryHandler>(AppHealthPaginateApplicationsQueryHandler);
        service = module.get<AppHealthPaginateApplicationsService>(AppHealthPaginateApplicationsService);
        repository = <AppHealthMockApplicationRepository>module.get<AppHealthIApplicationRepository>(AppHealthIApplicationRepository);
        mapper = new AppHealthApplicationMapper();
    });

    describe('main', () =>
    {
        test('AppHealthPaginateApplicationsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an applications paginated', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows : repository.collectionSource.slice(0,10),
                },
            )));
            expect(await queryHandler.execute(
                new AppHealthPaginateApplicationsQuery(
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
