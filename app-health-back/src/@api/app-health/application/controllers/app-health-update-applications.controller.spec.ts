import { AppHealthUpdateApplicationsController, AppHealthUpdateApplicationsHandler } from '@api/app-health/application';
import { appHealthMockApplicationData } from '@app/app-health/application';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateApplicationsController', () =>
{
    let controller: AppHealthUpdateApplicationsController;
    let handler: AppHealthUpdateApplicationsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthUpdateApplicationsController,
            ],
            providers: [
                {
                    provide : AppHealthUpdateApplicationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthUpdateApplicationsController>(AppHealthUpdateApplicationsController);
        handler = module.get<AppHealthUpdateApplicationsHandler>(AppHealthUpdateApplicationsHandler);
    });

    describe('main', () =>
    {
        test('AppHealthUpdateApplicationsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a applications updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationData[0])));
            expect(await controller.main(appHealthMockApplicationData[0])).toBe(appHealthMockApplicationData[0]);
        });
    });
});
