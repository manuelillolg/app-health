import { AppHealthPaginateApplicationsController, AppHealthPaginateApplicationsHandler } from '@api/app-health/application';
import { appHealthMockApplicationData } from '@app/app-health/application';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthPaginateApplicationsController', () =>
{
    let controller: AppHealthPaginateApplicationsController;
    let handler: AppHealthPaginateApplicationsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthPaginateApplicationsController,
            ],
            providers: [
                {
                    provide : AppHealthPaginateApplicationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthPaginateApplicationsController>(AppHealthPaginateApplicationsController);
        handler = module.get<AppHealthPaginateApplicationsHandler>(AppHealthPaginateApplicationsHandler);
    });

    describe('main', () =>
    {
        test('AppHealthPaginateApplicationsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a appHealthMockApplicationData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : appHealthMockApplicationData,
            })));
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : appHealthMockApplicationData,
            });
        });
    });
});
