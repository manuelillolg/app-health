import { AppHealthPaginateDatabasesController, AppHealthPaginateDatabasesHandler } from '@api/app-health/database';
import { appHealthMockDatabaseData } from '@app/app-health/database';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthPaginateDatabasesController', () =>
{
    let controller: AppHealthPaginateDatabasesController;
    let handler: AppHealthPaginateDatabasesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthPaginateDatabasesController,
            ],
            providers: [
                {
                    provide : AppHealthPaginateDatabasesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthPaginateDatabasesController>(AppHealthPaginateDatabasesController);
        handler = module.get<AppHealthPaginateDatabasesHandler>(AppHealthPaginateDatabasesHandler);
    });

    describe('main', () =>
    {
        test('AppHealthPaginateDatabasesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a appHealthMockDatabaseData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : appHealthMockDatabaseData,
            })));
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : appHealthMockDatabaseData,
            });
        });
    });
});
