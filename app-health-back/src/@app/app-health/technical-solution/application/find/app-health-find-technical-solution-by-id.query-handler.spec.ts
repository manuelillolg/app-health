import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthFindTechnicalSolutionByIdQueryHandler } from './app-health-find-technical-solution-by-id.query-handler';
import { AppHealthMockTechnicalSolutionRepository } from '@app/app-health/technical-solution/infrastructure/mock/app-health-mock-technical-solution.repository';
import { appHealthMockTechnicalSolutionData } from '@app/app-health/technical-solution/infrastructure/mock/app-health-mock-technical-solution.data';
import { AppHealthITechnicalSolutionRepository } from '@app/app-health/technical-solution/domain/app-health-technical-solution.repository';
import { AppHealthTechnicalSolutionMapper } from '@app/app-health/technical-solution/domain/app-health-technical-solution.mapper';
import { AppHealthFindTechnicalSolutionByIdQuery } from './app-health-find-technical-solution-by-id.query';
import { AppHealthFindTechnicalSolutionByIdService } from './app-health-find-technical-solution-by-id.service';

describe('AppHealthFindTechnicalSolutionByIdQueryHandler', () =>
{
    let queryHandler: AppHealthFindTechnicalSolutionByIdQueryHandler;
    let service: AppHealthFindTechnicalSolutionByIdService;
    let repository: AppHealthMockTechnicalSolutionRepository;
    let mapper: AppHealthTechnicalSolutionMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthFindTechnicalSolutionByIdQueryHandler,
                {
                    provide : AppHealthITechnicalSolutionRepository,
                    useClass: AppHealthMockTechnicalSolutionRepository,
                },
                {
                    provide : AppHealthFindTechnicalSolutionByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthFindTechnicalSolutionByIdQueryHandler>(AppHealthFindTechnicalSolutionByIdQueryHandler);
        service = module.get<AppHealthFindTechnicalSolutionByIdService>(AppHealthFindTechnicalSolutionByIdService);
        repository = <AppHealthMockTechnicalSolutionRepository>module.get<AppHealthITechnicalSolutionRepository>(AppHealthITechnicalSolutionRepository);
        mapper = new AppHealthTechnicalSolutionMapper();
    });

    describe('main', () =>
    {
        test('FindTechnicalSolutionByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an technicalSolution founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new AppHealthFindTechnicalSolutionByIdQuery(
                    appHealthMockTechnicalSolutionData[0].id,

                ),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
