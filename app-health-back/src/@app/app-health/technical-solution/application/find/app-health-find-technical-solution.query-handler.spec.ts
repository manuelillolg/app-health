import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthFindTechnicalSolutionQueryHandler } from './app-health-find-technical-solution.query-handler';
import { AppHealthMockTechnicalSolutionRepository } from '@app/app-health/technical-solution/infrastructure/mock/app-health-mock-technical-solution.repository';
import { AppHealthITechnicalSolutionRepository } from '@app/app-health/technical-solution/domain/app-health-technical-solution.repository';
import { AppHealthTechnicalSolutionMapper } from '@app/app-health/technical-solution/domain/app-health-technical-solution.mapper';
import { AppHealthFindTechnicalSolutionQuery } from './app-health-find-technical-solution.query';
import { AppHealthFindTechnicalSolutionService } from './app-health-find-technical-solution.service';

describe('AppHealthFindTechnicalSolutionQueryHandler', () =>
{
    let queryHandler: AppHealthFindTechnicalSolutionQueryHandler;
    let service: AppHealthFindTechnicalSolutionService;
    let repository: AppHealthMockTechnicalSolutionRepository;
    let mapper: AppHealthTechnicalSolutionMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthFindTechnicalSolutionQueryHandler,
                {
                    provide : AppHealthITechnicalSolutionRepository,
                    useClass: AppHealthMockTechnicalSolutionRepository,
                },
                {
                    provide : AppHealthFindTechnicalSolutionService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthFindTechnicalSolutionQueryHandler>(AppHealthFindTechnicalSolutionQueryHandler);
        service = module.get<AppHealthFindTechnicalSolutionService>(AppHealthFindTechnicalSolutionService);
        repository = <AppHealthMockTechnicalSolutionRepository>module.get<AppHealthITechnicalSolutionRepository>(AppHealthITechnicalSolutionRepository);
        mapper = new AppHealthTechnicalSolutionMapper();
    });

    describe('main', () =>
    {
        test('AppHealthFindTechnicalSolutionQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an technicalSolution founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new AppHealthFindTechnicalSolutionQuery(),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
