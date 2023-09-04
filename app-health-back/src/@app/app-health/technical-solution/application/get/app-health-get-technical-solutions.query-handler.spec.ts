import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthGetTechnicalSolutionsQueryHandler } from './app-health-get-technical-solutions.query-handler';
import { AppHealthMockTechnicalSolutionRepository } from '@app/app-health/technical-solution/infrastructure/mock/app-health-mock-technical-solution.repository';
import { AppHealthITechnicalSolutionRepository } from '@app/app-health/technical-solution/domain/app-health-technical-solution.repository';
import { AppHealthTechnicalSolutionMapper } from '@app/app-health/technical-solution/domain/app-health-technical-solution.mapper';
import { AppHealthGetTechnicalSolutionsQuery } from './app-health-get-technical-solutions.query';
import { AppHealthGetTechnicalSolutionsService } from './app-health-get-technical-solutions.service';

describe('GetTechnicalSolutionsQueryHandler', () =>
{
    let queryHandler: AppHealthGetTechnicalSolutionsQueryHandler;
    let service: AppHealthGetTechnicalSolutionsService;
    let repository: AppHealthMockTechnicalSolutionRepository;
    let mapper: AppHealthTechnicalSolutionMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthGetTechnicalSolutionsQueryHandler,
                {
                    provide : AppHealthITechnicalSolutionRepository,
                    useClass: AppHealthMockTechnicalSolutionRepository,
                },
                {
                    provide : AppHealthGetTechnicalSolutionsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthGetTechnicalSolutionsQueryHandler>(AppHealthGetTechnicalSolutionsQueryHandler);
        service = module.get<AppHealthGetTechnicalSolutionsService>(AppHealthGetTechnicalSolutionsService);
        repository = <AppHealthMockTechnicalSolutionRepository>module.get<AppHealthITechnicalSolutionRepository>(AppHealthITechnicalSolutionRepository);
        mapper = new AppHealthTechnicalSolutionMapper();
    });

    describe('main', () =>
    {
        test('AppHealthGetTechnicalSolutionsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an technicalSolutions founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new AppHealthGetTechnicalSolutionsQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});