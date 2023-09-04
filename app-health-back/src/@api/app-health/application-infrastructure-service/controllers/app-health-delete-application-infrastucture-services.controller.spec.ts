import { AppHealthDeleteApplicationInfrastuctureServicesController, AppHealthDeleteApplicationInfrastuctureServicesHandler } from '@api/app-health/application-infrastructure-service';
import { appHealthMockApplicationInfrastructureServiceData } from '@app/app-health/application-infrastructure-service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteApplicationInfrastuctureServicesController', () =>
{
    let controller: AppHealthDeleteApplicationInfrastuctureServicesController;
    let handler: AppHealthDeleteApplicationInfrastuctureServicesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthDeleteApplicationInfrastuctureServicesController,
            ],
            providers: [
                {
                    provide : AppHealthDeleteApplicationInfrastuctureServicesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthDeleteApplicationInfrastuctureServicesController>(AppHealthDeleteApplicationInfrastuctureServicesController);
        handler = module.get<AppHealthDeleteApplicationInfrastuctureServicesHandler>(AppHealthDeleteApplicationInfrastuctureServicesHandler);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteApplicationInfrastuctureServicesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an appHealthMockApplicationInfrastructureServiceData deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationInfrastructureServiceData)));
            expect(await controller.main()).toBe(appHealthMockApplicationInfrastructureServiceData);
        });
    });
});
