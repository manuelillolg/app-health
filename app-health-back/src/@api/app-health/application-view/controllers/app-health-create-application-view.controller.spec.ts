import { AppHealthCreateApplicationViewController, AppHealthCreateApplicationViewHandler } from '@api/app-health/application-view';
import { appHealthMockApplicationViewData } from '@app/app-health/application-view';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateApplicationViewController', () =>
{
    let controller: AppHealthCreateApplicationViewController;
    let handler: AppHealthCreateApplicationViewHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthCreateApplicationViewController,
            ],
            providers: [
                {
                    provide : AppHealthCreateApplicationViewHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthCreateApplicationViewController>(AppHealthCreateApplicationViewController);
        handler = module.get<AppHealthCreateApplicationViewHandler>(AppHealthCreateApplicationViewHandler);
    });

    describe('main', () =>
    {
        test('AppHealthCreateApplicationViewController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an applicationView created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationViewData[0])));
            expect(
                await controller.main(
                    appHealthMockApplicationViewData[0],
                ),
            )
                .toBe(appHealthMockApplicationViewData[0]);
        });
    });
});
