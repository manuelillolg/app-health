import { AppHealthCreateApplicationViewsController, AppHealthCreateApplicationViewsHandler } from '@api/app-health/application-view';
import { appHealthMockApplicationViewData } from '@app/app-health/application-view';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateApplicationViewsController', () =>
{
    let controller: AppHealthCreateApplicationViewsController;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                AppHealthCreateApplicationViewsController,
            ],
            providers: [
                {
                    provide : AppHealthCreateApplicationViewsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthCreateApplicationViewsController>(AppHealthCreateApplicationViewsController);
    });

    describe('main', () =>
    {
        test('AppHealthCreateApplicationViewsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an appHealthMockApplicationViewData created', async () =>
        {
            expect(
                await controller.main(
                    appHealthMockApplicationViewData,
                ),
            )
                .toBe(undefined);
        });
    });
});
