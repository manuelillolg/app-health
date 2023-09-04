import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockApplicationDatabaseData } from '@app/app-health/application-database/infrastructure/mock/app-health-mock-application-database.data';
import { AppHealthUpdateApplicationDatabasesCommandHandler } from './app-health-update-application-databases.command-handler';
import { AppHealthUpdateApplicationDatabasesCommand } from './app-health-update-application-databases.command';
import { AppHealthUpdateApplicationDatabasesService } from './app-health-update-application-databases.service';

describe('AppHealthUpdateApplicationDatabasesCommandHandler', () =>
{
    let commandHandler: AppHealthUpdateApplicationDatabasesCommandHandler;
    let service: AppHealthUpdateApplicationDatabasesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthUpdateApplicationDatabasesCommandHandler,
                {
                    provide : AppHealthUpdateApplicationDatabasesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthUpdateApplicationDatabasesCommandHandler>(AppHealthUpdateApplicationDatabasesCommandHandler);
        service = module.get<AppHealthUpdateApplicationDatabasesService>(AppHealthUpdateApplicationDatabasesService);
    });

    describe('main', () =>
    {
        test('UpdateApplicationDatabasesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an applicationDatabases updated', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthUpdateApplicationDatabasesCommand(
                    {
                        id: appHealthMockApplicationDatabaseData[0].id,
                        applicationId: appHealthMockApplicationDatabaseData[0].applicationId,
                        databaseId: appHealthMockApplicationDatabaseData[0].databaseId,
                        version: appHealthMockApplicationDatabaseData[0].version,
                        size: appHealthMockApplicationDatabaseData[0].size,
                        score: appHealthMockApplicationDatabaseData[0].score,
                        totalCollectionsTables: appHealthMockApplicationDatabaseData[0].totalCollectionsTables,
                        totalFields: appHealthMockApplicationDatabaseData[0].totalFields,
                        applicationInfrastructureServiceId: appHealthMockApplicationDatabaseData[0].applicationInfrastructureServiceId,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
