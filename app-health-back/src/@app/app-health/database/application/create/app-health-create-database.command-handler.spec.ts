import { AppHealthCreateDatabaseCommandHandler } from './app-health-create-database.command-handler';
import { AppHealthCreateDatabaseService } from './app-health-create-database.service';
import { AppHealthCreateDatabaseCommand, appHealthMockDatabaseData } from '@app/app-health/database';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateDatabaseCommandHandler', () =>
{
    let commandHandler: AppHealthCreateDatabaseCommandHandler;
    let service: AppHealthCreateDatabaseService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateDatabaseCommandHandler,
                {
                    provide : AppHealthCreateDatabaseService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthCreateDatabaseCommandHandler>(AppHealthCreateDatabaseCommandHandler);
        service = module.get<AppHealthCreateDatabaseService>(AppHealthCreateDatabaseService);
    });

    describe('main', () =>
    {
        test('CreateDatabaseCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the AppHealthCreateDatabaseService', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthCreateDatabaseCommand(
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
