import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockDatabaseData } from '@app/app-health/database/infrastructure/mock/app-health-mock-database.data';
import { AppHealthUpdateDatabaseByIdCommandHandler } from './app-health-update-database-by-id.command-handler';
import { AppHealthUpdateDatabaseByIdCommand } from './app-health-update-database-by-id.command';
import { AppHealthUpdateDatabaseByIdService } from './app-health-update-database-by-id.service';

describe('AppHealthUpdateDatabaseByIdCommandHandler', () =>
{
    let commandHandler: AppHealthUpdateDatabaseByIdCommandHandler;
    let service: AppHealthUpdateDatabaseByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthUpdateDatabaseByIdCommandHandler,
                {
                    provide : AppHealthUpdateDatabaseByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthUpdateDatabaseByIdCommandHandler>(AppHealthUpdateDatabaseByIdCommandHandler);
        service = module.get<AppHealthUpdateDatabaseByIdService>(AppHealthUpdateDatabaseByIdService);
    });

    describe('main', () =>
    {
        test('UpdateDatabaseByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an database created', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthUpdateDatabaseByIdCommand(
                    {
                        id: appHealthMockDatabaseData[0].id,
                        name: appHealthMockDatabaseData[0].name,
                        type: appHealthMockDatabaseData[0].type,
                        versions: appHealthMockDatabaseData[0].versions,
                    },
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
