import { AppHealthUpdateApplicationDatabasesController, AppHealthUpdateApplicationDatabasesHandler } from '@api/app-health/application-database';
import { appHealthMockApplicationDatabaseData } from '@app/app-health/application-database';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateApplicationDatabasesController', () =>
{
    let controller: AppHealthUpdateApplicationDatabasesController;
    let handler: AppHealthUpdateApplicationDatabasesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthUpdateApplicationDatabasesController,
            ],
            providers: [
                {
                    provide : AppHealthUpdateApplicationDatabasesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthUpdateApplicationDatabasesController>(AppHealthUpdateApplicationDatabasesController);
        handler = module.get<AppHealthUpdateApplicationDatabasesHandler>(AppHealthUpdateApplicationDatabasesHandler);
    });

    describe('main', () =>
    {
        test('AppHealthUpdateApplicationDatabasesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a applicationDatabases updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationDatabaseData[0])));
            expect(await controller.main(appHealthMockApplicationDatabaseData[0])).toBe(appHealthMockApplicationDatabaseData[0]);
        });
    });
});
