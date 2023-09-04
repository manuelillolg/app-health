/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AppHealthCreateTechnicalSolutionsService } from './app-health-create-technical-solutions.service';
import { AppHealthITechnicalSolutionRepository } from '../../domain/app-health-technical-solution.repository';
import { AppHealthMockTechnicalSolutionRepository } from '../../infrastructure/mock/app-health-mock-technical-solution.repository';

describe('AppHealthCreateTechnicalSolutionsService', () =>
{
    let service: AppHealthCreateTechnicalSolutionsService;
    let mockRepository: AppHealthMockTechnicalSolutionRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthCreateTechnicalSolutionsService,
                AppHealthMockTechnicalSolutionRepository,
                {
                    provide : AppHealthITechnicalSolutionRepository,
                    useValue: {
                        insert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthCreateTechnicalSolutionsService);
        mockRepository = module.get(AppHealthMockTechnicalSolutionRepository);
    });

    describe('main', () =>
    {
        test('CreateTechnicalSolutionsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create technicalSolutions and emit event', async () =>
        {
            expect(
                await service.main(
                    mockRepository.collectionSource,
                ),
            )
                .toBe(undefined);
        });
    });
});
