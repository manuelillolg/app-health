import { AppHealthUpdateInfrastructureServiceByIdController, AppHealthUpdateInfrastructureServiceByIdHandler } from '@api/app-health/infrastructure-service';
import { appHealthMockInfrastructureServiceData } from '@app/app-health/infrastructure-service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateInfrastructureServiceByIdController', () =>
{
    let controller: AppHealthUpdateInfrastructureServiceByIdController;
    let handler: AppHealthUpdateInfrastructureServiceByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthUpdateInfrastructureServiceByIdController,
            ],
            providers: [
                {
                    provide : AppHealthUpdateInfrastructureServiceByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthUpdateInfrastructureServiceByIdController>(AppHealthUpdateInfrastructureServiceByIdController);
        handler = module.get<AppHealthUpdateInfrastructureServiceByIdHandler>(AppHealthUpdateInfrastructureServiceByIdHandler);
    });

    describe('main', () =>
    {
        test('AppHealthUpdateInfrastructureServiceByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a infrastructureService updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockInfrastructureServiceData[0])));
            expect(await controller.main(appHealthMockInfrastructureServiceData[0])).toBe(appHealthMockInfrastructureServiceData[0]);
        });
    });
});
