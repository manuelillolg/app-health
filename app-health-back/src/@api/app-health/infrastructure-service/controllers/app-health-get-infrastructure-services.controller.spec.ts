import { AppHealthGetInfrastructureServicesController, AppHealthGetInfrastructureServicesHandler } from '@api/app-health/infrastructure-service';
import { appHealthMockInfrastructureServiceData } from '@app/app-health/infrastructure-service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthGetInfrastructureServicesController', () =>
{
    let controller: AppHealthGetInfrastructureServicesController;
    let handler: AppHealthGetInfrastructureServicesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthGetInfrastructureServicesController,
            ],
            providers: [
                {
                    provide : AppHealthGetInfrastructureServicesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthGetInfrastructureServicesController>(AppHealthGetInfrastructureServicesController);
        handler = module.get<AppHealthGetInfrastructureServicesHandler>(AppHealthGetInfrastructureServicesHandler);
    });

    describe('main', () =>
    {
        test('AppHealthGetInfrastructureServicesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a appHealthMockInfrastructureServiceData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockInfrastructureServiceData)));
            expect(await controller.main()).toBe(appHealthMockInfrastructureServiceData);
        });
    });
});
