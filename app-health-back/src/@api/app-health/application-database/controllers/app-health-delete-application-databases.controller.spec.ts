import { AppHealthDeleteApplicationDatabasesController, AppHealthDeleteApplicationDatabasesHandler } from '@api/app-health/application-database';
import { appHealthMockApplicationDatabaseData } from '@app/app-health/application-database';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteApplicationDatabasesController', () =>
{
    let controller: AppHealthDeleteApplicationDatabasesController;
    let handler: AppHealthDeleteApplicationDatabasesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthDeleteApplicationDatabasesController,
            ],
            providers: [
                {
                    provide : AppHealthDeleteApplicationDatabasesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthDeleteApplicationDatabasesController>(AppHealthDeleteApplicationDatabasesController);
        handler = module.get<AppHealthDeleteApplicationDatabasesHandler>(AppHealthDeleteApplicationDatabasesHandler);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteApplicationDatabasesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an appHealthMockApplicationDatabaseData deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationDatabaseData)));
            expect(await controller.main()).toBe(appHealthMockApplicationDatabaseData);
        });
    });
});
