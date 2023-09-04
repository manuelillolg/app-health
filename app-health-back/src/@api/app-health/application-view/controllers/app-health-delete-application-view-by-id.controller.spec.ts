/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthDeleteApplicationViewByIdController, AppHealthDeleteApplicationViewByIdHandler } from '@api/app-health/application-view';
import { appHealthMockApplicationViewData } from '@app/app-health/application-view';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteApplicationViewByIdController', () =>
{
    let controller: AppHealthDeleteApplicationViewByIdController;
    let handler: AppHealthDeleteApplicationViewByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthDeleteApplicationViewByIdController,
            ],
            providers: [
                {
                    provide : AppHealthDeleteApplicationViewByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthDeleteApplicationViewByIdController>(AppHealthDeleteApplicationViewByIdController);
        handler = module.get<AppHealthDeleteApplicationViewByIdHandler>(AppHealthDeleteApplicationViewByIdHandler);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteApplicationViewByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an applicationView deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationViewData[0])));
            expect(await controller.main(appHealthMockApplicationViewData[0].id)).toBe(appHealthMockApplicationViewData[0]);
        });
    });
});
