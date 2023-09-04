import { AppHealthGetApplicationInfrastuctureServicesController, AppHealthGetApplicationInfrastuctureServicesHandler } from '@api/app-health/application-infrastructure-service';
import { appHealthMockApplicationInfrastructureServiceData } from '@app/app-health/application-infrastructure-service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthGetApplicationInfrastuctureServicesController', () =>
{
    let controller: AppHealthGetApplicationInfrastuctureServicesController;
    let handler: AppHealthGetApplicationInfrastuctureServicesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthGetApplicationInfrastuctureServicesController,
            ],
            providers: [
                {
                    provide : AppHealthGetApplicationInfrastuctureServicesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthGetApplicationInfrastuctureServicesController>(AppHealthGetApplicationInfrastuctureServicesController);
        handler = module.get<AppHealthGetApplicationInfrastuctureServicesHandler>(AppHealthGetApplicationInfrastuctureServicesHandler);
    });

    describe('main', () =>
    {
        test('AppHealthGetApplicationInfrastuctureServicesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a appHealthMockApplicationInfrastructureServiceData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationInfrastructureServiceData)));
            expect(await controller.main()).toBe(appHealthMockApplicationInfrastructureServiceData);
        });
    });
});
