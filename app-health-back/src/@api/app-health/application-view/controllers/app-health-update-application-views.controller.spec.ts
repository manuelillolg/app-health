import { AppHealthUpdateApplicationViewsController, AppHealthUpdateApplicationViewsHandler } from '@api/app-health/application-view';
import { appHealthMockApplicationViewData } from '@app/app-health/application-view';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateApplicationViewsController', () =>
{
    let controller: AppHealthUpdateApplicationViewsController;
    let handler: AppHealthUpdateApplicationViewsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthUpdateApplicationViewsController,
            ],
            providers: [
                {
                    provide : AppHealthUpdateApplicationViewsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthUpdateApplicationViewsController>(AppHealthUpdateApplicationViewsController);
        handler = module.get<AppHealthUpdateApplicationViewsHandler>(AppHealthUpdateApplicationViewsHandler);
    });

    describe('main', () =>
    {
        test('AppHealthUpdateApplicationViewsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a applicationViews updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationViewData[0])));
            expect(await controller.main(appHealthMockApplicationViewData[0])).toBe(appHealthMockApplicationViewData[0]);
        });
    });
});
