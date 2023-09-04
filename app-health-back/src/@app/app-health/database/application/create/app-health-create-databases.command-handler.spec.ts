/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockDatabaseData } from '@app/app-health/database/infrastructure/mock/app-health-mock-database.data';
import { AppHealthCreateDatabasesCommandHandler } from './app-health-create-databases.command-handler';
import { AppHealthCreateDatabasesCommand } from './app-health-create-databases.command';
import { AppHealthCreateDatabasesService } from './app-health-create-databases.service';

describe('appHealthCreateDatabasesCommandHandler', () =>
{
    let commandHandler: AppHealthCreateDatabasesCommandHandler;
    let service: AppHealthCreateDatabasesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateDatabasesCommandHandler,
                {
                    provide : AppHealthCreateDatabasesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthCreateDatabasesCommandHandler>(AppHealthCreateDatabasesCommandHandler);
        service = module.get<AppHealthCreateDatabasesService>(AppHealthCreateDatabasesService);
    });

    describe('main', () =>
    {
        test('AppHealthCreateDatabasesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return AppHealthMockDatabaseData createds', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthCreateDatabasesCommand(
                    appHealthMockDatabaseData,
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
