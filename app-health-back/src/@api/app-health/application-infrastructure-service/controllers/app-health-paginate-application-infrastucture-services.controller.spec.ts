import { AppHealthPaginateApplicationInfrastuctureServicesController, AppHealthPaginateApplicationInfrastuctureServicesHandler } from '@api/app-health/application-infrastructure-service';
import { appHealthMockApplicationInfrastructureServiceData } from '@app/app-health/application-infrastructure-service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthPaginateApplicationInfrastuctureServicesController', () =>
{
    let controller: AppHealthPaginateApplicationInfrastuctureServicesController;
    let handler: AppHealthPaginateApplicationInfrastuctureServicesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthPaginateApplicationInfrastuctureServicesController,
            ],
            providers: [
                {
                    provide : AppHealthPaginateApplicationInfrastuctureServicesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthPaginateApplicationInfrastuctureServicesController>(AppHealthPaginateApplicationInfrastuctureServicesController);
        handler = module.get<AppHealthPaginateApplicationInfrastuctureServicesHandler>(AppHealthPaginateApplicationInfrastuctureServicesHandler);
    });

    describe('main', () =>
    {
        test('AppHealthPaginateApplicationInfrastuctureServicesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a appHealthMockApplicationInfrastructureServiceData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : appHealthMockApplicationInfrastructureServiceData,
            })));
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : appHealthMockApplicationInfrastructureServiceData,
            });
        });
    });
});
