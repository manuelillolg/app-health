import { AppHealthFindApplicationViewController, AppHealthFindApplicationViewHandler } from '@api/app-health/application-view';
import { appHealthMockApplicationViewData } from '@app/app-health/application-view';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindApplicationViewController', () =>
{
    let controller: AppHealthFindApplicationViewController;
    let handler: AppHealthFindApplicationViewHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthFindApplicationViewController,
            ],
            providers: [
                {
                    provide : AppHealthFindApplicationViewHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthFindApplicationViewController>(AppHealthFindApplicationViewController);
        handler = module.get<AppHealthFindApplicationViewHandler>(AppHealthFindApplicationViewHandler);
    });

    describe('main', () =>
    {
        test('AppHealthFindApplicationViewController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a applicationView', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationViewData[0])));
            expect(await controller.main()).toBe(appHealthMockApplicationViewData[0]);
        });
    });
});
