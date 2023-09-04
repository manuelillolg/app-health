import { AppHealthPaginateApplicationDatabasesController, AppHealthPaginateApplicationDatabasesHandler } from '@api/app-health/application-database';
import { appHealthMockApplicationDatabaseData } from '@app/app-health/application-database';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthPaginateApplicationDatabasesController', () =>
{
    let controller: AppHealthPaginateApplicationDatabasesController;
    let handler: AppHealthPaginateApplicationDatabasesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthPaginateApplicationDatabasesController,
            ],
            providers: [
                {
                    provide : AppHealthPaginateApplicationDatabasesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthPaginateApplicationDatabasesController>(AppHealthPaginateApplicationDatabasesController);
        handler = module.get<AppHealthPaginateApplicationDatabasesHandler>(AppHealthPaginateApplicationDatabasesHandler);
    });

    describe('main', () =>
    {
        test('AppHealthPaginateApplicationDatabasesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a appHealthMockApplicationDatabaseData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : appHealthMockApplicationDatabaseData,
            })));
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : appHealthMockApplicationDatabaseData,
            });
        });
    });
});
