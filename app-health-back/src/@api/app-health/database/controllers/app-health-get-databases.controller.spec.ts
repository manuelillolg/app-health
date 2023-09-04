import { AppHealthGetDatabasesController, AppHealthGetDatabasesHandler } from '@api/app-health/database';
import { appHealthMockDatabaseData } from '@app/app-health/database';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthGetDatabasesController', () =>
{
    let controller: AppHealthGetDatabasesController;
    let handler: AppHealthGetDatabasesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthGetDatabasesController,
            ],
            providers: [
                {
                    provide : AppHealthGetDatabasesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthGetDatabasesController>(AppHealthGetDatabasesController);
        handler = module.get<AppHealthGetDatabasesHandler>(AppHealthGetDatabasesHandler);
    });

    describe('main', () =>
    {
        test('AppHealthGetDatabasesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a appHealthMockDatabaseData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockDatabaseData)));
            expect(await controller.main()).toBe(appHealthMockDatabaseData);
        });
    });
});
