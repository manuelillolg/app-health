import { AppHealthUpdateApplicationByIdController, AppHealthUpdateApplicationByIdHandler } from '@api/app-health/application';
import { appHealthMockApplicationData } from '@app/app-health/application';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateApplicationByIdController', () =>
{
    let controller: AppHealthUpdateApplicationByIdController;
    let handler: AppHealthUpdateApplicationByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthUpdateApplicationByIdController,
            ],
            providers: [
                {
                    provide : AppHealthUpdateApplicationByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthUpdateApplicationByIdController>(AppHealthUpdateApplicationByIdController);
        handler = module.get<AppHealthUpdateApplicationByIdHandler>(AppHealthUpdateApplicationByIdHandler);
    });

    describe('main', () =>
    {
        test('AppHealthUpdateApplicationByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a application updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationData[0])));
            expect(await controller.main(appHealthMockApplicationData[0])).toBe(appHealthMockApplicationData[0]);
        });
    });
});
