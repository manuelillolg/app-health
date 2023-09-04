import { AppHealthFindApplicationViewByIdController, AppHealthFindApplicationViewByIdHandler } from '@api/app-health/application-view';
import { appHealthMockApplicationViewData } from '@app/app-health/application-view';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindApplicationViewByIdController', () =>
{
    let controller: AppHealthFindApplicationViewByIdController;
    let handler: AppHealthFindApplicationViewByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthFindApplicationViewByIdController,
            ],
            providers: [
                {
                    provide : AppHealthFindApplicationViewByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthFindApplicationViewByIdController>(AppHealthFindApplicationViewByIdController);
        handler = module.get<AppHealthFindApplicationViewByIdHandler>(AppHealthFindApplicationViewByIdHandler);
    });

    describe('main', () =>
    {
        test('AppHealthFindApplicationViewByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an applicationView by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationViewData[0])));
            expect(await controller.main(appHealthMockApplicationViewData[0].id)).toBe(appHealthMockApplicationViewData[0]);
        });
    });
});
