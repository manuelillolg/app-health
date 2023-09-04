import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthDeleteDatabasesCommandHandler } from './app-health-delete-databases.command-handler';
import { AppHealthDeleteDatabasesCommand } from './app-health-delete-databases.command';
import { AppHealthDeleteDatabasesService } from './app-health-delete-databases.service';

describe('AppHealthDeleteDatabasesCommandHandler', () =>
{
    let commandHandler: AppHealthDeleteDatabasesCommandHandler;
    let service: AppHealthDeleteDatabasesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthDeleteDatabasesCommandHandler,
                {
                    provide : AppHealthDeleteDatabasesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthDeleteDatabasesCommandHandler>(AppHealthDeleteDatabasesCommandHandler);
        service = module.get<AppHealthDeleteDatabasesService>(AppHealthDeleteDatabasesService);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteDatabasesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthDeleteDatabasesCommand(),
            )).toBe(undefined);
        });
    });
});
