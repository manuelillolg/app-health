import { AppHealthCreateApplicationInfrastructureServiceController, AppHealthCreateApplicationInfrastructureServiceHandler } from '@api/app-health/application-infrastructure-service';
import { appHealthMockApplicationInfrastructureServiceData } from '@app/app-health/application-infrastructure-service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateApplicationInfrastructureServiceController', () =>
{
    let controller: AppHealthCreateApplicationInfrastructureServiceController;
    let handler: AppHealthCreateApplicationInfrastructureServiceHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthCreateApplicationInfrastructureServiceController,
            ],
            providers: [
                {
                    provide : AppHealthCreateApplicationInfrastructureServiceHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthCreateApplicationInfrastructureServiceController>(AppHealthCreateApplicationInfrastructureServiceController);
        handler = module.get<AppHealthCreateApplicationInfrastructureServiceHandler>(AppHealthCreateApplicationInfrastructureServiceHandler);
    });

    describe('main', () =>
    {
        test('AppHealthCreateApplicationInfrastructureServiceController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an applicationInfrastructureService created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationInfrastructureServiceData[0])));
            expect(
                await controller.main(
                    appHealthMockApplicationInfrastructureServiceData[0],
                ),
            )
                .toBe(appHealthMockApplicationInfrastructureServiceData[0]);
        });
    });
});
