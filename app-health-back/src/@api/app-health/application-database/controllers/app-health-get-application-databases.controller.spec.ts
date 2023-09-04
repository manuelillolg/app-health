import { AppHealthGetApplicationDatabasesController, AppHealthGetApplicationDatabasesHandler } from '@api/app-health/application-database';
import { appHealthMockApplicationDatabaseData } from '@app/app-health/application-database';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthGetApplicationDatabasesController', () =>
{
    let controller: AppHealthGetApplicationDatabasesController;
    let handler: AppHealthGetApplicationDatabasesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthGetApplicationDatabasesController,
            ],
            providers: [
                {
                    provide : AppHealthGetApplicationDatabasesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthGetApplicationDatabasesController>(AppHealthGetApplicationDatabasesController);
        handler = module.get<AppHealthGetApplicationDatabasesHandler>(AppHealthGetApplicationDatabasesHandler);
    });

    describe('main', () =>
    {
        test('AppHealthGetApplicationDatabasesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a appHealthMockApplicationDatabaseData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationDatabaseData)));
            expect(await controller.main()).toBe(appHealthMockApplicationDatabaseData);
        });
    });
});
