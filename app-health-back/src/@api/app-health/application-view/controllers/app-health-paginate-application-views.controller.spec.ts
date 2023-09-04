import { AppHealthPaginateApplicationViewsController, AppHealthPaginateApplicationViewsHandler } from '@api/app-health/application-view';
import { appHealthMockApplicationViewData } from '@app/app-health/application-view';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthPaginateApplicationViewsController', () =>
{
    let controller: AppHealthPaginateApplicationViewsController;
    let handler: AppHealthPaginateApplicationViewsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthPaginateApplicationViewsController,
            ],
            providers: [
                {
                    provide : AppHealthPaginateApplicationViewsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthPaginateApplicationViewsController>(AppHealthPaginateApplicationViewsController);
        handler = module.get<AppHealthPaginateApplicationViewsHandler>(AppHealthPaginateApplicationViewsHandler);
    });

    describe('main', () =>
    {
        test('AppHealthPaginateApplicationViewsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a appHealthMockApplicationViewData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : appHealthMockApplicationViewData,
            })));
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : appHealthMockApplicationViewData,
            });
        });
    });
});
