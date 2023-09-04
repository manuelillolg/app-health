import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthDeleteApplicationDatabasesCommandHandler } from './app-health-delete-application-databases.command-handler';
import { AppHealthDeleteApplicationDatabasesCommand } from './app-health-delete-application-databases.command';
import { AppHealthDeleteApplicationDatabasesService } from './app-health-delete-application-databases.service';

describe('AppHealthDeleteApplicationDatabasesCommandHandler', () =>
{
    let commandHandler: AppHealthDeleteApplicationDatabasesCommandHandler;
    let service: AppHealthDeleteApplicationDatabasesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthDeleteApplicationDatabasesCommandHandler,
                {
                    provide : AppHealthDeleteApplicationDatabasesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthDeleteApplicationDatabasesCommandHandler>(AppHealthDeleteApplicationDatabasesCommandHandler);
        service = module.get<AppHealthDeleteApplicationDatabasesService>(AppHealthDeleteApplicationDatabasesService);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteApplicationDatabasesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthDeleteApplicationDatabasesCommand(),
            )).toBe(undefined);
        });
    });
});
