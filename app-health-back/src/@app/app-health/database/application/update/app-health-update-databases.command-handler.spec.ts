import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockDatabaseData } from '@app/app-health/database/infrastructure/mock/app-health-mock-database.data';
import { AppHealthUpdateDatabasesCommandHandler } from './app-health-update-databases.command-handler';
import { AppHealthUpdateDatabasesCommand } from './app-health-update-databases.command';
import { AppHealthUpdateDatabasesService } from './app-health-update-databases.service';

describe('AppHealthUpdateDatabasesCommandHandler', () =>
{
    let commandHandler: AppHealthUpdateDatabasesCommandHandler;
    let service: AppHealthUpdateDatabasesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthUpdateDatabasesCommandHandler,
                {
                    provide : AppHealthUpdateDatabasesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthUpdateDatabasesCommandHandler>(AppHealthUpdateDatabasesCommandHandler);
        service = module.get<AppHealthUpdateDatabasesService>(AppHealthUpdateDatabasesService);
    });

    describe('main', () =>
    {
        test('UpdateDatabasesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an databases updated', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthUpdateDatabasesCommand(
                    {
                        id: appHealthMockDatabaseData[0].id,
                        name: appHealthMockDatabaseData[0].name,
                        type: appHealthMockDatabaseData[0].type,
                        versions: appHealthMockDatabaseData[0].versions,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
