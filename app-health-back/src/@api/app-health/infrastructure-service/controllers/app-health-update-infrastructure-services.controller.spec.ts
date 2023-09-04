import { AppHealthUpdateInfrastructureServicesController, AppHealthUpdateInfrastructureServicesHandler } from '@api/app-health/infrastructure-service';
import { appHealthMockInfrastructureServiceData } from '@app/app-health/infrastructure-service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateInfrastructureServicesController', () =>
{
    let controller: AppHealthUpdateInfrastructureServicesController;
    let handler: AppHealthUpdateInfrastructureServicesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthUpdateInfrastructureServicesController,
            ],
            providers: [
                {
                    provide : AppHealthUpdateInfrastructureServicesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthUpdateInfrastructureServicesController>(AppHealthUpdateInfrastructureServicesController);
        handler = module.get<AppHealthUpdateInfrastructureServicesHandler>(AppHealthUpdateInfrastructureServicesHandler);
    });

    describe('main', () =>
    {
        test('AppHealthUpdateInfrastructureServicesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a infrastructureServices updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockInfrastructureServiceData[0])));
            expect(await controller.main(appHealthMockInfrastructureServiceData[0])).toBe(appHealthMockInfrastructureServiceData[0]);
        });
    });
});
