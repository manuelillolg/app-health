import { AppHealthUpsertApplicationViewController, AppHealthUpsertApplicationViewHandler } from '@api/app-health/application-view';
import { appHealthMockApplicationViewData } from '@app/app-health/application-view';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpsertApplicationViewController', () =>
{
    let controller: AppHealthUpsertApplicationViewController;
    let handler: AppHealthUpsertApplicationViewHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthUpsertApplicationViewController,
            ],
            providers: [
                {
                    provide : AppHealthUpsertApplicationViewHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthUpsertApplicationViewController>(AppHealthUpsertApplicationViewController);
        handler = module.get<AppHealthUpsertApplicationViewHandler>(AppHealthUpsertApplicationViewHandler);
    });

    describe('main', () =>
    {
        test('AppHealthUpsertApplicationViewController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an applicationView upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationViewData[0])));
            expect(await controller.main(appHealthMockApplicationViewData[0])).toBe(appHealthMockApplicationViewData[0]);
        });
    });
});
