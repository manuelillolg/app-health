/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockApplicationDatabaseData } from '@app/app-health/application-database/infrastructure/mock/app-health-mock-application-database.data';
import { AppHealthCreateApplicationDatabasesCommandHandler } from './app-health-create-application-databases.command-handler';
import { AppHealthCreateApplicationDatabasesCommand } from './app-health-create-application-databases.command';
import { AppHealthCreateApplicationDatabasesService } from './app-health-create-application-databases.service';

describe('appHealthCreateApplicationDatabasesCommandHandler', () =>
{
    let commandHandler: AppHealthCreateApplicationDatabasesCommandHandler;
    let service: AppHealthCreateApplicationDatabasesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateApplicationDatabasesCommandHandler,
                {
                    provide : AppHealthCreateApplicationDatabasesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthCreateApplicationDatabasesCommandHandler>(AppHealthCreateApplicationDatabasesCommandHandler);
        service = module.get<AppHealthCreateApplicationDatabasesService>(AppHealthCreateApplicationDatabasesService);
    });

    describe('main', () =>
    {
        test('AppHealthCreateApplicationDatabasesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return AppHealthMockApplicationDatabaseData createds', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthCreateApplicationDatabasesCommand(
                    appHealthMockApplicationDatabaseData,
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
