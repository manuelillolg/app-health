import { AppHealthUpdateApplicationInfrastructureServiceByIdController, AppHealthUpdateApplicationInfrastructureServiceByIdHandler } from '@api/app-health/application-infrastructure-service';
import { appHealthMockApplicationInfrastructureServiceData } from '@app/app-health/application-infrastructure-service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateApplicationInfrastructureServiceByIdController', () =>
{
    let controller: AppHealthUpdateApplicationInfrastructureServiceByIdController;
    let handler: AppHealthUpdateApplicationInfrastructureServiceByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthUpdateApplicationInfrastructureServiceByIdController,
            ],
            providers: [
                {
                    provide : AppHealthUpdateApplicationInfrastructureServiceByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthUpdateApplicationInfrastructureServiceByIdController>(AppHealthUpdateApplicationInfrastructureServiceByIdController);
        handler = module.get<AppHealthUpdateApplicationInfrastructureServiceByIdHandler>(AppHealthUpdateApplicationInfrastructureServiceByIdHandler);
    });

    describe('main', () =>
    {
        test('AppHealthUpdateApplicationInfrastructureServiceByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a applicationInfrastructureService updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationInfrastructureServiceData[0])));
            expect(await controller.main(appHealthMockApplicationInfrastructureServiceData[0])).toBe(appHealthMockApplicationInfrastructureServiceData[0]);
        });
    });
});
