import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockDatabaseData } from '@app/app-health/database/infrastructure/mock/app-health-mock-database.data';
import { AppHealthUpsertDatabaseCommandHandler } from './app-health-upsert-database.command-handler';
import { AppHealthUpsertDatabaseCommand } from './app-health-upsert-database.command';
import { AppHealthUpsertDatabaseService } from './app-health-upsert-database.service';

describe('AppHealthUpsertDatabaseCommandHandler', () =>
{
    let commandHandler: AppHealthUpsertDatabaseCommandHandler;
    let service: AppHealthUpsertDatabaseService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthUpsertDatabaseCommandHandler,
                {
                    provide : AppHealthUpsertDatabaseService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthUpsertDatabaseCommandHandler>(AppHealthUpsertDatabaseCommandHandler);
        service = module.get<AppHealthUpsertDatabaseService>(AppHealthUpsertDatabaseService);
    });

    describe('main', () =>
    {
        test('UpsertDatabaseCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the AppHealthUpsertDatabaseService', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthUpsertDatabaseCommand(
                    {
                        id: appHealthMockDatabaseData[0].id,
                        name: appHealthMockDatabaseData[0].name,
                        type: appHealthMockDatabaseData[0].type,
                        versions: appHealthMockDatabaseData[0].versions,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
