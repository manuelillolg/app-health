import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockApplicationDatabaseData } from '@app/app-health/application-database/infrastructure/mock/app-health-mock-application-database.data';
import { AppHealthUpdateApplicationDatabaseByIdCommandHandler } from './app-health-update-application-database-by-id.command-handler';
import { AppHealthUpdateApplicationDatabaseByIdCommand } from './app-health-update-application-database-by-id.command';
import { AppHealthUpdateApplicationDatabaseByIdService } from './app-health-update-application-database-by-id.service';

describe('AppHealthUpdateApplicationDatabaseByIdCommandHandler', () =>
{
    let commandHandler: AppHealthUpdateApplicationDatabaseByIdCommandHandler;
    let service: AppHealthUpdateApplicationDatabaseByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthUpdateApplicationDatabaseByIdCommandHandler,
                {
                    provide : AppHealthUpdateApplicationDatabaseByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthUpdateApplicationDatabaseByIdCommandHandler>(AppHealthUpdateApplicationDatabaseByIdCommandHandler);
        service = module.get<AppHealthUpdateApplicationDatabaseByIdService>(AppHealthUpdateApplicationDatabaseByIdService);
    });

    describe('main', () =>
    {
        test('UpdateApplicationDatabaseByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an applicationDatabase created', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthUpdateApplicationDatabaseByIdCommand(
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
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
