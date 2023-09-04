import { AppHealthDeleteApplicationsController, AppHealthDeleteApplicationsHandler } from '@api/app-health/application';
import { appHealthMockApplicationData } from '@app/app-health/application';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteApplicationsController', () =>
{
    let controller: AppHealthDeleteApplicationsController;
    let handler: AppHealthDeleteApplicationsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthDeleteApplicationsController,
            ],
            providers: [
                {
                    provide : AppHealthDeleteApplicationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthDeleteApplicationsController>(AppHealthDeleteApplicationsController);
        handler = module.get<AppHealthDeleteApplicationsHandler>(AppHealthDeleteApplicationsHandler);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteApplicationsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an appHealthMockApplicationData deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationData)));
            expect(await controller.main()).toBe(appHealthMockApplicationData);
        });
    });
});
