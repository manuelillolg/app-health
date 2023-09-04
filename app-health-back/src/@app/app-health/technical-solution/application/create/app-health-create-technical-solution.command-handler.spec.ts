import { AppHealthCreateTechnicalSolutionCommandHandler } from './app-health-create-technical-solution.command-handler';
import { AppHealthCreateTechnicalSolutionService } from './app-health-create-technical-solution.service';
import { AppHealthCreateTechnicalSolutionCommand, appHealthMockTechnicalSolutionData } from '@app/app-health/technical-solution';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateTechnicalSolutionCommandHandler', () =>
{
    let commandHandler: AppHealthCreateTechnicalSolutionCommandHandler;
    let service: AppHealthCreateTechnicalSolutionService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateTechnicalSolutionCommandHandler,
                {
                    provide : AppHealthCreateTechnicalSolutionService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthCreateTechnicalSolutionCommandHandler>(AppHealthCreateTechnicalSolutionCommandHandler);
        service = module.get<AppHealthCreateTechnicalSolutionService>(AppHealthCreateTechnicalSolutionService);
    });

    describe('main', () =>
    {
        test('CreateTechnicalSolutionCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the AppHealthCreateTechnicalSolutionService', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthCreateTechnicalSolutionCommand(
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
