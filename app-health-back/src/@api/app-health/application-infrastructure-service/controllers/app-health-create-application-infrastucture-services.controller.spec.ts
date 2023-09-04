import { AppHealthCreateApplicationInfrastuctureServicesController, AppHealthCreateApplicationInfrastuctureServicesHandler } from '@api/app-health/application-infrastructure-service';
import { appHealthMockApplicationInfrastructureServiceData } from '@app/app-health/application-infrastructure-service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateApplicationInfrastuctureServicesController', () =>
{
    let controller: AppHealthCreateApplicationInfrastuctureServicesController;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                AppHealthCreateApplicationInfrastuctureServicesController,
            ],
            providers: [
                {
                    provide : AppHealthCreateApplicationInfrastuctureServicesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthCreateApplicationInfrastuctureServicesController>(AppHealthCreateApplicationInfrastuctureServicesController);
    });

    describe('main', () =>
    {
        test('AppHealthCreateApplicationInfrastuctureServicesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an appHealthMockApplicationInfrastructureServiceData created', async () =>
        {
            expect(
                await controller.main(
                    appHealthMockApplicationInfrastructureServiceData,
                ),
            )
                .toBe(undefined);
        });
    });
});
