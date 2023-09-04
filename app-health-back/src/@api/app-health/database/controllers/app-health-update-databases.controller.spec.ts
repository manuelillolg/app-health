import { AppHealthUpdateDatabasesController, AppHealthUpdateDatabasesHandler } from '@api/app-health/database';
import { appHealthMockDatabaseData } from '@app/app-health/database';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateDatabasesController', () =>
{
    let controller: AppHealthUpdateDatabasesController;
    let handler: AppHealthUpdateDatabasesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthUpdateDatabasesController,
            ],
            providers: [
                {
                    provide : AppHealthUpdateDatabasesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthUpdateDatabasesController>(AppHealthUpdateDatabasesController);
        handler = module.get<AppHealthUpdateDatabasesHandler>(AppHealthUpdateDatabasesHandler);
    });

    describe('main', () =>
    {
        test('AppHealthUpdateDatabasesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a databases updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockDatabaseData[0])));
            expect(await controller.main(appHealthMockDatabaseData[0])).toBe(appHealthMockDatabaseData[0]);
        });
    });
});
