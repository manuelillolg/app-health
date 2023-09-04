import { AppHealthCreateInfrastructureServiceController, AppHealthCreateInfrastructureServiceHandler } from '@api/app-health/infrastructure-service';
import { appHealthMockInfrastructureServiceData } from '@app/app-health/infrastructure-service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateInfrastructureServiceController', () =>
{
    let controller: AppHealthCreateInfrastructureServiceController;
    let handler: AppHealthCreateInfrastructureServiceHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthCreateInfrastructureServiceController,
            ],
            providers: [
                {
                    provide : AppHealthCreateInfrastructureServiceHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthCreateInfrastructureServiceController>(AppHealthCreateInfrastructureServiceController);
        handler = module.get<AppHealthCreateInfrastructureServiceHandler>(AppHealthCreateInfrastructureServiceHandler);
    });

    describe('main', () =>
    {
        test('AppHealthCreateInfrastructureServiceController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an infrastructureService created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockInfrastructureServiceData[0])));
            expect(
                await controller.main(
                    appHealthMockInfrastructureServiceData[0],
                ),
            )
                .toBe(appHealthMockInfrastructureServiceData[0]);
        });
    });
});
