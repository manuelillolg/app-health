import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthDeleteApplicationsCommandHandler } from './app-health-delete-applications.command-handler';
import { AppHealthDeleteApplicationsCommand } from './app-health-delete-applications.command';
import { AppHealthDeleteApplicationsService } from './app-health-delete-applications.service';

describe('AppHealthDeleteApplicationsCommandHandler', () =>
{
    let commandHandler: AppHealthDeleteApplicationsCommandHandler;
    let service: AppHealthDeleteApplicationsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthDeleteApplicationsCommandHandler,
                {
                    provide : AppHealthDeleteApplicationsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthDeleteApplicationsCommandHandler>(AppHealthDeleteApplicationsCommandHandler);
        service = module.get<AppHealthDeleteApplicationsService>(AppHealthDeleteApplicationsService);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteApplicationsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthDeleteApplicationsCommand(),
            )).toBe(undefined);
        });
    });
});
