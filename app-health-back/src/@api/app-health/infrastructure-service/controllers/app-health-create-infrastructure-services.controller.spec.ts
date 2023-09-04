import { AppHealthCreateInfrastructureServicesController, AppHealthCreateInfrastructureServicesHandler } from '@api/app-health/infrastructure-service';
import { appHealthMockInfrastructureServiceData } from '@app/app-health/infrastructure-service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateInfrastructureServicesController', () =>
{
    let controller: AppHealthCreateInfrastructureServicesController;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                AppHealthCreateInfrastructureServicesController,
            ],
            providers: [
                {
                    provide : AppHealthCreateInfrastructureServicesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthCreateInfrastructureServicesController>(AppHealthCreateInfrastructureServicesController);
    });

    describe('main', () =>
    {
        test('AppHealthCreateInfrastructureServicesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an appHealthMockInfrastructureServiceData created', async () =>
        {
            expect(
                await controller.main(
                    appHealthMockInfrastructureServiceData,
                ),
            )
                .toBe(undefined);
        });
    });
});
