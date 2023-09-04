import { AppHealthGetApplicationsController, AppHealthGetApplicationsHandler } from '@api/app-health/application';
import { appHealthMockApplicationData } from '@app/app-health/application';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthGetApplicationsController', () =>
{
    let controller: AppHealthGetApplicationsController;
    let handler: AppHealthGetApplicationsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthGetApplicationsController,
            ],
            providers: [
                {
                    provide : AppHealthGetApplicationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthGetApplicationsController>(AppHealthGetApplicationsController);
        handler = module.get<AppHealthGetApplicationsHandler>(AppHealthGetApplicationsHandler);
    });

    describe('main', () =>
    {
        test('AppHealthGetApplicationsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a appHealthMockApplicationData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationData)));
            expect(await controller.main()).toBe(appHealthMockApplicationData);
        });
    });
});
