import { AppHealthUpdateApplicationViewByIdController, AppHealthUpdateApplicationViewByIdHandler } from '@api/app-health/application-view';
import { appHealthMockApplicationViewData } from '@app/app-health/application-view';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateApplicationViewByIdController', () =>
{
    let controller: AppHealthUpdateApplicationViewByIdController;
    let handler: AppHealthUpdateApplicationViewByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthUpdateApplicationViewByIdController,
            ],
            providers: [
                {
                    provide : AppHealthUpdateApplicationViewByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthUpdateApplicationViewByIdController>(AppHealthUpdateApplicationViewByIdController);
        handler = module.get<AppHealthUpdateApplicationViewByIdHandler>(AppHealthUpdateApplicationViewByIdHandler);
    });

    describe('main', () =>
    {
        test('AppHealthUpdateApplicationViewByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a applicationView updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationViewData[0])));
            expect(await controller.main(appHealthMockApplicationViewData[0])).toBe(appHealthMockApplicationViewData[0]);
        });
    });
});
