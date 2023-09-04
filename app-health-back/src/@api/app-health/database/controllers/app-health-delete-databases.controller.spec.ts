import { AppHealthDeleteDatabasesController, AppHealthDeleteDatabasesHandler } from '@api/app-health/database';
import { appHealthMockDatabaseData } from '@app/app-health/database';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteDatabasesController', () =>
{
    let controller: AppHealthDeleteDatabasesController;
    let handler: AppHealthDeleteDatabasesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthDeleteDatabasesController,
            ],
            providers: [
                {
                    provide : AppHealthDeleteDatabasesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthDeleteDatabasesController>(AppHealthDeleteDatabasesController);
        handler = module.get<AppHealthDeleteDatabasesHandler>(AppHealthDeleteDatabasesHandler);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteDatabasesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an appHealthMockDatabaseData deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockDatabaseData)));
            expect(await controller.main()).toBe(appHealthMockDatabaseData);
        });
    });
});
