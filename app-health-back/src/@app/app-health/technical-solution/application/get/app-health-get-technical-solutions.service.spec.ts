import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AppHealthGetTechnicalSolutionsService } from './app-health-get-technical-solutions.service';
import { AppHealthITechnicalSolutionRepository } from '../../domain/app-health-technical-solution.repository';
import { AppHealthMockTechnicalSolutionRepository } from '../../infrastructure/mock/app-health-mock-technical-solution.repository';

describe('AppHealthGetTechnicalSolutionsService', () =>
{
    let service: AppHealthGetTechnicalSolutionsService;
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
                AppHealthGetTechnicalSolutionsService,
                AppHealthMockTechnicalSolutionRepository,
                {
                    provide : AppHealthITechnicalSolutionRepository,
                    useValue: {
                        get: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthGetTechnicalSolutionsService);
        repository = module.get(AppHealthITechnicalSolutionRepository);
        mockRepository = module.get(AppHealthMockTechnicalSolutionRepository);
    });

    describe('main', () =>
    {
        test('GetTechnicalSolutionsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get technicalSolutions', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
