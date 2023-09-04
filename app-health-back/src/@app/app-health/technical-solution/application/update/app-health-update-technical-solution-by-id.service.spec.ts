/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { appHealthMockTechnicalSolutionData } from '@app/app-health/technical-solution/infrastructure/mock/app-health-mock-technical-solution.data';
import { AppHealthUpdateTechnicalSolutionByIdService } from './app-health-update-technical-solution-by-id.service';
import {
    AppHealthTechnicalSolutionId,
    AppHealthTechnicalSolutionCustomerId,
    AppHealthTechnicalSolutionName,
    AppHealthTechnicalSolutionDescription,
    AppHealthTechnicalSolutionArchitectureDiagram,
    AppHealthTechnicalSolutionProposal,
    AppHealthTechnicalSolutionCreatedAt,
    AppHealthTechnicalSolutionUpdatedAt,
    AppHealthTechnicalSolutionDeletedAt,
} from '../../domain/value-objects';
import { AppHealthITechnicalSolutionRepository } from '../../domain/app-health-technical-solution.repository';
import { AppHealthMockTechnicalSolutionRepository } from '../../infrastructure/mock/app-health-mock-technical-solution.repository';

describe('AppHealthUpdateTechnicalSolutionByIdService', () =>
{
    let service: AppHealthUpdateTechnicalSolutionByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthUpdateTechnicalSolutionByIdService,
                AppHealthMockTechnicalSolutionRepository,
                {
                    provide : AppHealthITechnicalSolutionRepository,
                    useValue: {
                        updateById: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthUpdateTechnicalSolutionByIdService);
    });

    describe('main', () =>
    {
        test('AppHealthUpdateTechnicalSolutionByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a technicalSolution and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new AppHealthTechnicalSolutionId(appHealthMockTechnicalSolutionData[0].id),
                        customerId: new AppHealthTechnicalSolutionCustomerId(appHealthMockTechnicalSolutionData[0].customerId),
                        name: new AppHealthTechnicalSolutionName(appHealthMockTechnicalSolutionData[0].name),
                        description: new AppHealthTechnicalSolutionDescription(appHealthMockTechnicalSolutionData[0].description),
                        architectureDiagram: new AppHealthTechnicalSolutionArchitectureDiagram(appHealthMockTechnicalSolutionData[0].architectureDiagram),
                        proposal: new AppHealthTechnicalSolutionProposal(appHealthMockTechnicalSolutionData[0].proposal),
                    },
                    {},
                ),
            ).toBe(undefined);
        });
    });
});
