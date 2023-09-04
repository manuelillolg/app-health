import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthDeleteApplicationDatabaseByIdCommandHandler } from './app-health-delete-application-database-by-id.command-handler';
import { appHealthMockApplicationDatabaseData } from '@app/app-health/application-database/infrastructure/mock/app-health-mock-application-database.data';
import { AppHealthDeleteApplicationDatabaseByIdCommand } from './app-health-delete-application-database-by-id.command';
import { AppHealthDeleteApplicationDatabaseByIdService } from './app-health-delete-application-database-by-id.service';

describe('AppHealthDeleteApplicationDatabaseByIdCommandHandler', () =>
{
    let commandHandler: AppHealthDeleteApplicationDatabaseByIdCommandHandler;
    let service: AppHealthDeleteApplicationDatabaseByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthDeleteApplicationDatabaseByIdCommandHandler,
                {
                    provide : AppHealthDeleteApplicationDatabaseByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthDeleteApplicationDatabaseByIdCommandHandler>(AppHealthDeleteApplicationDatabaseByIdCommandHandler);
        service = module.get<AppHealthDeleteApplicationDatabaseByIdService>(AppHealthDeleteApplicationDatabaseByIdService);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteApplicationDatabaseByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the AppHealthDeleteApplicationDatabaseByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthDeleteApplicationDatabaseByIdCommand(
                    appHealthMockApplicationDatabaseData[0].id,
                ),
            )).toBe(undefined);
        });
    });
});
