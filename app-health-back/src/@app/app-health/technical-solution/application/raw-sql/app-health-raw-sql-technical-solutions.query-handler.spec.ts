import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthMockTechnicalSolutionRepository } from '@app/app-health/technical-solution/infrastructure/mock/app-health-mock-technical-solution.repository';
import { AppHealthITechnicalSolutionRepository } from '@app/app-health/technical-solution/domain/app-health-technical-solution.repository';
import { AppHealthTechnicalSolutionMapper } from '@app/app-health/technical-solution/domain/app-health-technical-solution.mapper';
import { AppHealthRawSQLTechnicalSolutionsQueryHandler } from './app-health-raw-sql-technical-solutions.query-handler';
import { AppHealthRawSQLTechnicalSolutionsQuery } from './app-health-raw-sql-technical-solutions.query';
import { AppHealthRawSQLTechnicalSolutionsService } from './app-health-raw-sql-technical-solutions.service';

describe('RawSQLTechnicalSolutionsQueryHandler', () =>
{
    let queryHandler: AppHealthRawSQLTechnicalSolutionsQueryHandler;
    let service: AppHealthRawSQLTechnicalSolutionsService;
    let repository: AppHealthMockTechnicalSolutionRepository;
    let mapper: AppHealthTechnicalSolutionMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthRawSQLTechnicalSolutionsQueryHandler,
                {
                    provide : AppHealthITechnicalSolutionRepository,
                    useClass: AppHealthMockTechnicalSolutionRepository,
                },
                {
                    provide : AppHealthRawSQLTechnicalSolutionsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthRawSQLTechnicalSolutionsQueryHandler>(AppHealthRawSQLTechnicalSolutionsQueryHandler);
        service = module.get<AppHealthRawSQLTechnicalSolutionsService>(AppHealthRawSQLTechnicalSolutionsService);
        repository = <AppHealthMockTechnicalSolutionRepository>module.get<AppHealthITechnicalSolutionRepository>(AppHealthITechnicalSolutionRepository);
        mapper = new AppHealthTechnicalSolutionMapper();
    });

    describe('main', () =>
    {
        test('AppHealthRawSQLTechnicalSolutionsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an technicalSolutions founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new AppHealthRawSQLTechnicalSolutionsQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
