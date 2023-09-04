import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AppHealthPaginateTechnicalSolutionsService } from './app-health-paginate-technical-solutions.service';
import { AppHealthITechnicalSolutionRepository } from '../../domain/app-health-technical-solution.repository';
import { AppHealthMockTechnicalSolutionRepository } from '../../infrastructure/mock/app-health-mock-technical-solution.repository';

describe('AppHealthPaginateTechnicalSolutionsService', () =>
{
    let service: AppHealthPaginateTechnicalSolutionsService;
    let repository: AppHealthITechnicalSolutionRepository;
    let mockRepository: AppHealthMockTechnicalSolutionRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthPaginateTechnicalSolutionsService,
                AppHealthMockTechnicalSolutionRepository,
                {
                    provide : AppHealthITechnicalSolutionRepository,
                    useValue: {
                        paginate: (queryStatement, constraints) => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthPaginateTechnicalSolutionsService);
        repository = module.get(AppHealthITechnicalSolutionRepository);
        mockRepository = module.get(AppHealthMockTechnicalSolutionRepository);
    });

    describe('main', () =>
    {
        test('AppHealthPaginateTechnicalSolutionsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should paginate technicalSolutions', async () =>
        {
            jest.spyOn(repository, 'paginate').mockImplementation(() => new Promise(resolve => resolve({
                total: mockRepository.collectionSource.slice(0,10).length,
                count: mockRepository.collectionSource.slice(0,10).length,
                rows : mockRepository.collectionSource.slice(0,10),
            })));
            expect(await service.main({
                offset: 0,
                limit : 10
            })).toStrictEqual({
                total: mockRepository.collectionSource.slice(0,10).length,
                count: mockRepository.collectionSource.slice(0,10).length,
                rows : mockRepository.collectionSource.slice(0,10),
            });
        });
    });
});
