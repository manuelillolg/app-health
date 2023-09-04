/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthDeleteApplicationByIdController, AppHealthDeleteApplicationByIdHandler } from '@api/app-health/application';
import { appHealthMockApplicationData } from '@app/app-health/application';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteApplicationByIdController', () =>
{
    let controller: AppHealthDeleteApplicationByIdController;
    let handler: AppHealthDeleteApplicationByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthDeleteApplicationByIdController,
            ],
            providers: [
                {
                    provide : AppHealthDeleteApplicationByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthDeleteApplicationByIdController>(AppHealthDeleteApplicationByIdController);
        handler = module.get<AppHealthDeleteApplicationByIdHandler>(AppHealthDeleteApplicationByIdHandler);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteApplicationByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an application deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationData[0])));
            expect(await controller.main(appHealthMockApplicationData[0].id)).toBe(appHealthMockApplicationData[0]);
        });
    });
});
