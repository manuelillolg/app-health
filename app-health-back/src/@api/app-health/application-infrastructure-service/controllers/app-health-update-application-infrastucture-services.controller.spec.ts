import { AppHealthUpdateApplicationInfrastuctureServicesController, AppHealthUpdateApplicationInfrastuctureServicesHandler } from '@api/app-health/application-infrastructure-service';
import { appHealthMockApplicationInfrastructureServiceData } from '@app/app-health/application-infrastructure-service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateApplicationInfrastuctureServicesController', () =>
{
    let controller: AppHealthUpdateApplicationInfrastuctureServicesController;
    let handler: AppHealthUpdateApplicationInfrastuctureServicesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthUpdateApplicationInfrastuctureServicesController,
            ],
            providers: [
                {
                    provide : AppHealthUpdateApplicationInfrastuctureServicesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthUpdateApplicationInfrastuctureServicesController>(AppHealthUpdateApplicationInfrastuctureServicesController);
        handler = module.get<AppHealthUpdateApplicationInfrastuctureServicesHandler>(AppHealthUpdateApplicationInfrastuctureServicesHandler);
    });

    describe('main', () =>
    {
        test('AppHealthUpdateApplicationInfrastuctureServicesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a applicationInfrastuctureServices updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationInfrastructureServiceData[0])));
            expect(await controller.main(appHealthMockApplicationInfrastructureServiceData[0])).toBe(appHealthMockApplicationInfrastructureServiceData[0]);
        });
    });
});
