/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockTechnicalSolutionData } from '@app/app-health/technical-solution/infrastructure/mock/app-health-mock-technical-solution.data';
import { AppHealthCreateTechnicalSolutionsCommandHandler } from './app-health-create-technical-solutions.command-handler';
import { AppHealthCreateTechnicalSolutionsCommand } from './app-health-create-technical-solutions.command';
import { AppHealthCreateTechnicalSolutionsService } from './app-health-create-technical-solutions.service';

describe('appHealthCreateTechnicalSolutionsCommandHandler', () =>
{
    let commandHandler: AppHealthCreateTechnicalSolutionsCommandHandler;
    let service: AppHealthCreateTechnicalSolutionsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateTechnicalSolutionsCommandHandler,
                {
                    provide : AppHealthCreateTechnicalSolutionsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthCreateTechnicalSolutionsCommandHandler>(AppHealthCreateTechnicalSolutionsCommandHandler);
        service = module.get<AppHealthCreateTechnicalSolutionsService>(AppHealthCreateTechnicalSolutionsService);
    });

    describe('main', () =>
    {
        test('AppHealthCreateTechnicalSolutionsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return AppHealthMockTechnicalSolutionData createds', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthCreateTechnicalSolutionsCommand(
                    appHealthMockTechnicalSolutionData,
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
