import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthDeleteDatabaseByIdCommandHandler } from './app-health-delete-database-by-id.command-handler';
import { appHealthMockDatabaseData } from '@app/app-health/database/infrastructure/mock/app-health-mock-database.data';
import { AppHealthDeleteDatabaseByIdCommand } from './app-health-delete-database-by-id.command';
import { AppHealthDeleteDatabaseByIdService } from './app-health-delete-database-by-id.service';

describe('AppHealthDeleteDatabaseByIdCommandHandler', () =>
{
    let commandHandler: AppHealthDeleteDatabaseByIdCommandHandler;
    let service: AppHealthDeleteDatabaseByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthDeleteDatabaseByIdCommandHandler,
                {
                    provide : AppHealthDeleteDatabaseByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthDeleteDatabaseByIdCommandHandler>(AppHealthDeleteDatabaseByIdCommandHandler);
        service = module.get<AppHealthDeleteDatabaseByIdService>(AppHealthDeleteDatabaseByIdService);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteDatabaseByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the AppHealthDeleteDatabaseByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthDeleteDatabaseByIdCommand(
                    appHealthMockDatabaseData[0].id,
                ),
            )).toBe(undefined);
        });
    });
});
