import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockTechnicalSolutionData } from '@app/app-health/technical-solution/infrastructure/mock/app-health-mock-technical-solution.data';
import { AppHealthUpsertTechnicalSolutionCommandHandler } from './app-health-upsert-technical-solution.command-handler';
import { AppHealthUpsertTechnicalSolutionCommand } from './app-health-upsert-technical-solution.command';
import { AppHealthUpsertTechnicalSolutionService } from './app-health-upsert-technical-solution.service';

describe('AppHealthUpsertTechnicalSolutionCommandHandler', () =>
{
    let commandHandler: AppHealthUpsertTechnicalSolutionCommandHandler;
    let service: AppHealthUpsertTechnicalSolutionService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthUpsertTechnicalSolutionCommandHandler,
                {
                    provide : AppHealthUpsertTechnicalSolutionService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthUpsertTechnicalSolutionCommandHandler>(AppHealthUpsertTechnicalSolutionCommandHandler);
        service = module.get<AppHealthUpsertTechnicalSolutionService>(AppHealthUpsertTechnicalSolutionService);
    });

    describe('main', () =>
    {
        test('UpsertTechnicalSolutionCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the AppHealthUpsertTechnicalSolutionService', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthUpsertTechnicalSolutionCommand(
                    {
                        id: appHealthMockTechnicalSolutionData[0].id,
                        customerId: appHealthMockTechnicalSolutionData[0].customerId,
                        name: appHealthMockTechnicalSolutionData[0].name,
                        description: appHealthMockTechnicalSolutionData[0].description,
                        architectureDiagram: appHealthMockTechnicalSolutionData[0].architectureDiagram,
                        proposal: appHealthMockTechnicalSolutionData[0].proposal,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
