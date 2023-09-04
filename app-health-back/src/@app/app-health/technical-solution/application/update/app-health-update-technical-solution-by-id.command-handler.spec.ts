import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockTechnicalSolutionData } from '@app/app-health/technical-solution/infrastructure/mock/app-health-mock-technical-solution.data';
import { AppHealthUpdateTechnicalSolutionByIdCommandHandler } from './app-health-update-technical-solution-by-id.command-handler';
import { AppHealthUpdateTechnicalSolutionByIdCommand } from './app-health-update-technical-solution-by-id.command';
import { AppHealthUpdateTechnicalSolutionByIdService } from './app-health-update-technical-solution-by-id.service';

describe('AppHealthUpdateTechnicalSolutionByIdCommandHandler', () =>
{
    let commandHandler: AppHealthUpdateTechnicalSolutionByIdCommandHandler;
    let service: AppHealthUpdateTechnicalSolutionByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthUpdateTechnicalSolutionByIdCommandHandler,
                {
                    provide : AppHealthUpdateTechnicalSolutionByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthUpdateTechnicalSolutionByIdCommandHandler>(AppHealthUpdateTechnicalSolutionByIdCommandHandler);
        service = module.get<AppHealthUpdateTechnicalSolutionByIdService>(AppHealthUpdateTechnicalSolutionByIdService);
    });

    describe('main', () =>
    {
        test('UpdateTechnicalSolutionByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an technicalSolution created', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthUpdateTechnicalSolutionByIdCommand(
                    {
                        id: appHealthMockTechnicalSolutionData[0].id,
                        customerId: appHealthMockTechnicalSolutionData[0].customerId,
                        name: appHealthMockTechnicalSolutionData[0].name,
                        description: appHealthMockTechnicalSolutionData[0].description,
                        architectureDiagram: appHealthMockTechnicalSolutionData[0].architectureDiagram,
                        proposal: appHealthMockTechnicalSolutionData[0].proposal,
                    },
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
