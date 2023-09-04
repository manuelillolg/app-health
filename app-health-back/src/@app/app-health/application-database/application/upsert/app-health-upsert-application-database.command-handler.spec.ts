import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockApplicationDatabaseData } from '@app/app-health/application-database/infrastructure/mock/app-health-mock-application-database.data';
import { AppHealthUpsertApplicationDatabaseCommandHandler } from './app-health-upsert-application-database.command-handler';
import { AppHealthUpsertApplicationDatabaseCommand } from './app-health-upsert-application-database.command';
import { AppHealthUpsertApplicationDatabaseService } from './app-health-upsert-application-database.service';

describe('AppHealthUpsertApplicationDatabaseCommandHandler', () =>
{
    let commandHandler: AppHealthUpsertApplicationDatabaseCommandHandler;
    let service: AppHealthUpsertApplicationDatabaseService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthUpsertApplicationDatabaseCommandHandler,
                {
                    provide : AppHealthUpsertApplicationDatabaseService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthUpsertApplicationDatabaseCommandHandler>(AppHealthUpsertApplicationDatabaseCommandHandler);
        service = module.get<AppHealthUpsertApplicationDatabaseService>(AppHealthUpsertApplicationDatabaseService);
    });

    describe('main', () =>
    {
        test('UpsertApplicationDatabaseCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the AppHealthUpsertApplicationDatabaseService', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthUpsertApplicationDatabaseCommand(
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
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
