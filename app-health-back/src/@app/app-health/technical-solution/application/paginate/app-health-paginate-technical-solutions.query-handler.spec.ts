import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResponse } from '@aurorajs.dev/core';

// custom items
import { AppHealthPaginateTechnicalSolutionsQueryHandler } from './app-health-paginate-technical-solutions.query-handler';
import { AppHealthMockTechnicalSolutionRepository } from '@app/app-health/technical-solution/infrastructure/mock/app-health-mock-technical-solution.repository';
import { AppHealthITechnicalSolutionRepository } from '@app/app-health/technical-solution/domain/app-health-technical-solution.repository';
import { AppHealthTechnicalSolutionMapper } from '@app/app-health/technical-solution/domain/app-health-technical-solution.mapper';
import { AppHealthPaginateTechnicalSolutionsQuery } from './app-health-paginate-technical-solutions.query';
import { AppHealthPaginateTechnicalSolutionsService } from './app-health-paginate-technical-solutions.service';

describe('AppHealthPaginateTechnicalSolutionsQueryHandler', () =>
{
    let queryHandler: AppHealthPaginateTechnicalSolutionsQueryHandler;
    let service: AppHealthPaginateTechnicalSolutionsService;
    let repository: AppHealthMockTechnicalSolutionRepository;
    let mapper: AppHealthTechnicalSolutionMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthPaginateTechnicalSolutionsQueryHandler,
                {
                    provide : AppHealthITechnicalSolutionRepository,
                    useClass: AppHealthMockTechnicalSolutionRepository,
                },
                {
                    provide : AppHealthPaginateTechnicalSolutionsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthPaginateTechnicalSolutionsQueryHandler>(AppHealthPaginateTechnicalSolutionsQueryHandler);
        service = module.get<AppHealthPaginateTechnicalSolutionsService>(AppHealthPaginateTechnicalSolutionsService);
        repository = <AppHealthMockTechnicalSolutionRepository>module.get<AppHealthITechnicalSolutionRepository>(AppHealthITechnicalSolutionRepository);
        mapper = new AppHealthTechnicalSolutionMapper();
    });

    describe('main', () =>
    {
        test('AppHealthPaginateTechnicalSolutionsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an technicalSolutions paginated', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows : repository.collectionSource.slice(0,10),
                },
            )));
            expect(await queryHandler.execute(
                new AppHealthPaginateTechnicalSolutionsQuery(
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
