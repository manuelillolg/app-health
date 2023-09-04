/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AppHealthDeleteTechnicalSolutionsService } from './app-health-delete-technical-solutions.service';
import { AppHealthITechnicalSolutionRepository } from '../../domain/app-health-technical-solution.repository';
import { AppHealthMockTechnicalSolutionRepository } from '../../infrastructure/mock/app-health-mock-technical-solution.repository';

describe('AppHealthDeleteTechnicalSolutionsService', () =>
{
    let service: AppHealthDeleteTechnicalSolutionsService;
    let repository: AppHealthITechnicalSolutionRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthDeleteTechnicalSolutionsService,
                AppHealthMockTechnicalSolutionRepository,
                {
                    provide : AppHealthITechnicalSolutionRepository,
                    useValue: {
                        get   : () => { /**/ },
                        delete: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthDeleteTechnicalSolutionsService);
        repository = module.get(AppHealthITechnicalSolutionRepository);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteTechnicalSolutionsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete technicalSolution and emit event', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve([])));
            expect(
                await service.main(
                    {},
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});
