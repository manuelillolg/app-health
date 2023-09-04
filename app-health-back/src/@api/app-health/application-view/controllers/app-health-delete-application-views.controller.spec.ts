import { AppHealthDeleteApplicationViewsController, AppHealthDeleteApplicationViewsHandler } from '@api/app-health/application-view';
import { appHealthMockApplicationViewData } from '@app/app-health/application-view';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteApplicationViewsController', () =>
{
    let controller: AppHealthDeleteApplicationViewsController;
    let handler: AppHealthDeleteApplicationViewsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthDeleteApplicationViewsController,
            ],
            providers: [
                {
                    provide : AppHealthDeleteApplicationViewsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthDeleteApplicationViewsController>(AppHealthDeleteApplicationViewsController);
        handler = module.get<AppHealthDeleteApplicationViewsHandler>(AppHealthDeleteApplicationViewsHandler);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteApplicationViewsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an appHealthMockApplicationViewData deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationViewData)));
            expect(await controller.main()).toBe(appHealthMockApplicationViewData);
        });
    });
});
