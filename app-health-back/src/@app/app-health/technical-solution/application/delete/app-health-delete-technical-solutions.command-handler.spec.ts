import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthDeleteTechnicalSolutionsCommandHandler } from './app-health-delete-technical-solutions.command-handler';
import { AppHealthDeleteTechnicalSolutionsCommand } from './app-health-delete-technical-solutions.command';
import { AppHealthDeleteTechnicalSolutionsService } from './app-health-delete-technical-solutions.service';

describe('AppHealthDeleteTechnicalSolutionsCommandHandler', () =>
{
    let commandHandler: AppHealthDeleteTechnicalSolutionsCommandHandler;
    let service: AppHealthDeleteTechnicalSolutionsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthDeleteTechnicalSolutionsCommandHandler,
                {
                    provide : AppHealthDeleteTechnicalSolutionsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthDeleteTechnicalSolutionsCommandHandler>(AppHealthDeleteTechnicalSolutionsCommandHandler);
        service = module.get<AppHealthDeleteTechnicalSolutionsService>(AppHealthDeleteTechnicalSolutionsService);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteTechnicalSolutionsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthDeleteTechnicalSolutionsCommand(),
            )).toBe(undefined);
        });
    });
});
