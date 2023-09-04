import { AppHealthFindDatabaseController, AppHealthFindDatabaseHandler } from '@api/app-health/database';
import { appHealthMockDatabaseData } from '@app/app-health/database';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindDatabaseController', () =>
{
    let controller: AppHealthFindDatabaseController;
    let handler: AppHealthFindDatabaseHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthFindDatabaseController,
            ],
            providers: [
                {
                    provide : AppHealthFindDatabaseHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthFindDatabaseController>(AppHealthFindDatabaseController);
        handler = module.get<AppHealthFindDatabaseHandler>(AppHealthFindDatabaseHandler);
    });

    describe('main', () =>
    {
        test('AppHealthFindDatabaseController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a database', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockDatabaseData[0])));
            expect(await controller.main()).toBe(appHealthMockDatabaseData[0]);
        });
    });
});
