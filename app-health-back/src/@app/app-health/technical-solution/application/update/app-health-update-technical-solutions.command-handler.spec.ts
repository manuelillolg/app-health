import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockTechnicalSolutionData } from '@app/app-health/technical-solution/infrastructure/mock/app-health-mock-technical-solution.data';
import { AppHealthUpdateTechnicalSolutionsCommandHandler } from './app-health-update-technical-solutions.command-handler';
import { AppHealthUpdateTechnicalSolutionsCommand } from './app-health-update-technical-solutions.command';
import { AppHealthUpdateTechnicalSolutionsService } from './app-health-update-technical-solutions.service';

describe('AppHealthUpdateTechnicalSolutionsCommandHandler', () =>
{
    let commandHandler: AppHealthUpdateTechnicalSolutionsCommandHandler;
    let service: AppHealthUpdateTechnicalSolutionsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthUpdateTechnicalSolutionsCommandHandler,
                {
                    provide : AppHealthUpdateTechnicalSolutionsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthUpdateTechnicalSolutionsCommandHandler>(AppHealthUpdateTechnicalSolutionsCommandHandler);
        service = module.get<AppHealthUpdateTechnicalSolutionsService>(AppHealthUpdateTechnicalSolutionsService);
    });

    describe('main', () =>
    {
        test('UpdateTechnicalSolutionsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an technicalSolutions updated', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthUpdateTechnicalSolutionsCommand(
                    {
                        id: appHealthMockTechnicalSolutionData[0].id,
                        customerId: appHealthMockTechnicalSolutionData[0].customerId,
                        name: appHealthMockTechnicalSolutionData[0].name,
                        description: appHealthMockTechnicalSolutionData[0].description,
                        architectureDiagram: appHealthMockTechnicalSolutionData[0].architectureDiagram,
                        proposal: appHealthMockTechnicalSolutionData[0].proposal,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
