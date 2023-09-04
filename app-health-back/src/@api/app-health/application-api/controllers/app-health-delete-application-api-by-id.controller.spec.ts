/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthDeleteApplicationApiByIdController, AppHealthDeleteApplicationApiByIdHandler } from '@api/app-health/application-api';
import { appHealthMockApplicationApiData } from '@app/app-health/application-api';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteApplicationApiByIdController', () =>
{
    let controller: AppHealthDeleteApplicationApiByIdController;
    let handler: AppHealthDeleteApplicationApiByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthDeleteApplicationApiByIdController,
            ],
            providers: [
                {
                    provide : AppHealthDeleteApplicationApiByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthDeleteApplicationApiByIdController>(AppHealthDeleteApplicationApiByIdController);
        handler = module.get<AppHealthDeleteApplicationApiByIdHandler>(AppHealthDeleteApplicationApiByIdHandler);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteApplicationApiByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an applicationApi deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationApiData[0])));
            expect(await controller.main(appHealthMockApplicationApiData[0].id)).toBe(appHealthMockApplicationApiData[0]);
        });
    });
});
