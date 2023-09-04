import { AppHealthCreateApplicationDatabaseCommandHandler } from './app-health-create-application-database.command-handler';
import { AppHealthCreateApplicationDatabaseService } from './app-health-create-application-database.service';
import { AppHealthCreateApplicationDatabaseCommand, appHealthMockApplicationDatabaseData } from '@app/app-health/application-database';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateApplicationDatabaseCommandHandler', () =>
{
    let commandHandler: AppHealthCreateApplicationDatabaseCommandHandler;
    let service: AppHealthCreateApplicationDatabaseService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateApplicationDatabaseCommandHandler,
                {
                    provide : AppHealthCreateApplicationDatabaseService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthCreateApplicationDatabaseCommandHandler>(AppHealthCreateApplicationDatabaseCommandHandler);
        service = module.get<AppHealthCreateApplicationDatabaseService>(AppHealthCreateApplicationDatabaseService);
    });

    describe('main', () =>
    {
        test('CreateApplicationDatabaseCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the AppHealthCreateApplicationDatabaseService', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthCreateApplicationDatabaseCommand(
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
