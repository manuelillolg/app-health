import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AppHealthRawSQLTechnicalSolutionsService } from './app-health-raw-sql-technical-solutions.service';
import { AppHealthITechnicalSolutionRepository } from '../../domain/app-health-technical-solution.repository';
import { AppHealthMockTechnicalSolutionRepository } from '../../infrastructure/mock/app-health-mock-technical-solution.repository';

describe('AppHealthRawSQLTechnicalSolutionsService ', () =>
{
    let service: AppHealthRawSQLTechnicalSolutionsService ;
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
                AppHealthRawSQLTechnicalSolutionsService ,
                AppHealthMockTechnicalSolutionRepository,
                {
                    provide : AppHealthITechnicalSolutionRepository,
                    useValue: {
                        rawSQL: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(AppHealthRawSQLTechnicalSolutionsService );
        repository      = module.get(AppHealthITechnicalSolutionRepository);
        mockRepository  = module.get(AppHealthMockTechnicalSolutionRepository);
    });

    describe('main', () =>
    {
        test('RawSQLTechnicalSolutionsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get technicalSolutions', async () =>
        {
            jest.spyOn(repository, 'rawSQL').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
