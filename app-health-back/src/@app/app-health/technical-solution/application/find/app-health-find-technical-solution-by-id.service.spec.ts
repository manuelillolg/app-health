import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { appHealthMockTechnicalSolutionData } from '@app/app-health/technical-solution/infrastructure/mock/app-health-mock-technical-solution.data';
import { AppHealthFindTechnicalSolutionByIdService } from './app-health-find-technical-solution-by-id.service';
import { AppHealthTechnicalSolutionId } from '../../domain/value-objects';
import { AppHealthITechnicalSolutionRepository } from '../../domain/app-health-technical-solution.repository';
import { AppHealthMockTechnicalSolutionRepository } from '../../infrastructure/mock/app-health-mock-technical-solution.repository';

describe('AppHealthFindTechnicalSolutionByIdService', () =>
{
    let service: AppHealthFindTechnicalSolutionByIdService;
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
                AppHealthFindTechnicalSolutionByIdService,
                AppHealthMockTechnicalSolutionRepository,
                {
                    provide : AppHealthITechnicalSolutionRepository,
                    useValue: {
                        findById: id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthFindTechnicalSolutionByIdService);
        repository = module.get(AppHealthITechnicalSolutionRepository);
        mockRepository = module.get(AppHealthMockTechnicalSolutionRepository);
    });

    describe('main', () =>
    {
        test('FindTechnicalSolutionByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find technicalSolution by id', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new AppHealthTechnicalSolutionId(appHealthMockTechnicalSolutionData[0].id),
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});
