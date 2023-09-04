import { AppHealthFindApplicationController, AppHealthFindApplicationHandler } from '@api/app-health/application';
import { appHealthMockApplicationData } from '@app/app-health/application';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindApplicationController', () =>
{
    let controller: AppHealthFindApplicationController;
    let handler: AppHealthFindApplicationHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthFindApplicationController,
            ],
            providers: [
                {
                    provide : AppHealthFindApplicationHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthFindApplicationController>(AppHealthFindApplicationController);
        handler = module.get<AppHealthFindApplicationHandler>(AppHealthFindApplicationHandler);
    });

    describe('main', () =>
    {
        test('AppHealthFindApplicationController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a application', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationData[0])));
            expect(await controller.main()).toBe(appHealthMockApplicationData[0]);
        });
    });
});
