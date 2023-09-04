import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthDeleteTechnicalSolutionByIdCommandHandler } from './app-health-delete-technical-solution-by-id.command-handler';
import { appHealthMockTechnicalSolutionData } from '@app/app-health/technical-solution/infrastructure/mock/app-health-mock-technical-solution.data';
import { AppHealthDeleteTechnicalSolutionByIdCommand } from './app-health-delete-technical-solution-by-id.command';
import { AppHealthDeleteTechnicalSolutionByIdService } from './app-health-delete-technical-solution-by-id.service';

describe('AppHealthDeleteTechnicalSolutionByIdCommandHandler', () =>
{
    let commandHandler: AppHealthDeleteTechnicalSolutionByIdCommandHandler;
    let service: AppHealthDeleteTechnicalSolutionByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthDeleteTechnicalSolutionByIdCommandHandler,
                {
                    provide : AppHealthDeleteTechnicalSolutionByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthDeleteTechnicalSolutionByIdCommandHandler>(AppHealthDeleteTechnicalSolutionByIdCommandHandler);
        service = module.get<AppHealthDeleteTechnicalSolutionByIdService>(AppHealthDeleteTechnicalSolutionByIdService);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteTechnicalSolutionByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the AppHealthDeleteTechnicalSolutionByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthDeleteTechnicalSolutionByIdCommand(
                    appHealthMockTechnicalSolutionData[0].id,
                ),
            )).toBe(undefined);
        });
    });
});
