import { AppHealthPaginateInfrastructureServicesController, AppHealthPaginateInfrastructureServicesHandler } from '@api/app-health/infrastructure-service';
import { appHealthMockInfrastructureServiceData } from '@app/app-health/infrastructure-service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthPaginateInfrastructureServicesController', () =>
{
    let controller: AppHealthPaginateInfrastructureServicesController;
    let handler: AppHealthPaginateInfrastructureServicesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthPaginateInfrastructureServicesController,
            ],
            providers: [
                {
                    provide : AppHealthPaginateInfrastructureServicesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthPaginateInfrastructureServicesController>(AppHealthPaginateInfrastructureServicesController);
        handler = module.get<AppHealthPaginateInfrastructureServicesHandler>(AppHealthPaginateInfrastructureServicesHandler);
    });

    describe('main', () =>
    {
        test('AppHealthPaginateInfrastructureServicesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a appHealthMockInfrastructureServiceData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : appHealthMockInfrastructureServiceData,
            })));
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : appHealthMockInfrastructureServiceData,
            });
        });
    });
});
