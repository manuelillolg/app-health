import { AppHealthFindApplicationByIdController, AppHealthFindApplicationByIdHandler } from '@api/app-health/application';
import { appHealthMockApplicationData } from '@app/app-health/application';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindApplicationByIdController', () =>
{
    let controller: AppHealthFindApplicationByIdController;
    let handler: AppHealthFindApplicationByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthFindApplicationByIdController,
            ],
            providers: [
                {
                    provide : AppHealthFindApplicationByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthFindApplicationByIdController>(AppHealthFindApplicationByIdController);
        handler = module.get<AppHealthFindApplicationByIdHandler>(AppHealthFindApplicationByIdHandler);
    });

    describe('main', () =>
    {
        test('AppHealthFindApplicationByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an application by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationData[0])));
            expect(await controller.main(appHealthMockApplicationData[0].id)).toBe(appHealthMockApplicationData[0]);
        });
    });
});
