import { AppHealthFindApplicationDatabaseController, AppHealthFindApplicationDatabaseHandler } from '@api/app-health/application-database';
import { appHealthMockApplicationDatabaseData } from '@app/app-health/application-database';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindApplicationDatabaseController', () =>
{
    let controller: AppHealthFindApplicationDatabaseController;
    let handler: AppHealthFindApplicationDatabaseHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthFindApplicationDatabaseController,
            ],
            providers: [
                {
                    provide : AppHealthFindApplicationDatabaseHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthFindApplicationDatabaseController>(AppHealthFindApplicationDatabaseController);
        handler = module.get<AppHealthFindApplicationDatabaseHandler>(AppHealthFindApplicationDatabaseHandler);
    });

    describe('main', () =>
    {
        test('AppHealthFindApplicationDatabaseController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a applicationDatabase', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationDatabaseData[0])));
            expect(await controller.main()).toBe(appHealthMockApplicationDatabaseData[0]);
        });
    });
});
