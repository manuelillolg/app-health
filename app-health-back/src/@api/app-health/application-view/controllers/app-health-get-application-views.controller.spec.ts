import { AppHealthGetApplicationViewsController, AppHealthGetApplicationViewsHandler } from '@api/app-health/application-view';
import { appHealthMockApplicationViewData } from '@app/app-health/application-view';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthGetApplicationViewsController', () =>
{
    let controller: AppHealthGetApplicationViewsController;
    let handler: AppHealthGetApplicationViewsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthGetApplicationViewsController,
            ],
            providers: [
                {
                    provide : AppHealthGetApplicationViewsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthGetApplicationViewsController>(AppHealthGetApplicationViewsController);
        handler = module.get<AppHealthGetApplicationViewsHandler>(AppHealthGetApplicationViewsHandler);
    });

    describe('main', () =>
    {
        test('AppHealthGetApplicationViewsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a appHealthMockApplicationViewData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationViewData)));
            expect(await controller.main()).toBe(appHealthMockApplicationViewData);
        });
    });
});
