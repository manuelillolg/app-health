import { AppHealthDeleteInfrastructureServicesController, AppHealthDeleteInfrastructureServicesHandler } from '@api/app-health/infrastructure-service';
import { appHealthMockInfrastructureServiceData } from '@app/app-health/infrastructure-service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteInfrastructureServicesController', () =>
{
    let controller: AppHealthDeleteInfrastructureServicesController;
    let handler: AppHealthDeleteInfrastructureServicesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthDeleteInfrastructureServicesController,
            ],
            providers: [
                {
                    provide : AppHealthDeleteInfrastructureServicesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthDeleteInfrastructureServicesController>(AppHealthDeleteInfrastructureServicesController);
        handler = module.get<AppHealthDeleteInfrastructureServicesHandler>(AppHealthDeleteInfrastructureServicesHandler);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteInfrastructureServicesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an appHealthMockInfrastructureServiceData deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockInfrastructureServiceData)));
            expect(await controller.main()).toBe(appHealthMockInfrastructureServiceData);
        });
    });
});
