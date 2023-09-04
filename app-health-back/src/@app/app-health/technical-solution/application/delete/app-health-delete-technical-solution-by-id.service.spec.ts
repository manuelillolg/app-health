/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { appHealthMockTechnicalSolutionData } from '@app/app-health/technical-solution/infrastructure/mock/app-health-mock-technical-solution.data';
import { AppHealthDeleteTechnicalSolutionByIdService } from './app-health-delete-technical-solution-by-id.service';
import { AppHealthTechnicalSolutionId } from '../../domain/value-objects';
import { AppHealthITechnicalSolutionRepository } from '../../domain/app-health-technical-solution.repository';
import { AppHealthMockTechnicalSolutionRepository } from '../../infrastructure/mock/app-health-mock-technical-solution.repository';

describe('AppHealthDeleteTechnicalSolutionByIdService', () =>
{
    let service: AppHealthDeleteTechnicalSolutionByIdService;
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
                AppHealthDeleteTechnicalSolutionByIdService,
                AppHealthMockTechnicalSolutionRepository,
                {
                    provide : AppHealthITechnicalSolutionRepository,
                    useValue: {
                        deleteById: id => { /**/ },
                        findById  : id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthDeleteTechnicalSolutionByIdService);
        repository = module.get(AppHealthITechnicalSolutionRepository);
        mockRepository = module.get(AppHealthMockTechnicalSolutionRepository);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteTechnicalSolutionByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete technicalSolution and emit event', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(
                await service.main(
                    new AppHealthTechnicalSolutionId(appHealthMockTechnicalSolutionData[0].id),
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});
