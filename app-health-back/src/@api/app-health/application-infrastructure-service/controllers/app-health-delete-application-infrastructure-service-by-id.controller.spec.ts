/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthDeleteApplicationInfrastructureServiceByIdController, AppHealthDeleteApplicationInfrastructureServiceByIdHandler } from '@api/app-health/application-infrastructure-service';
import { appHealthMockApplicationInfrastructureServiceData } from '@app/app-health/application-infrastructure-service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteApplicationInfrastructureServiceByIdController', () =>
{
    let controller: AppHealthDeleteApplicationInfrastructureServiceByIdController;
    let handler: AppHealthDeleteApplicationInfrastructureServiceByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthDeleteApplicationInfrastructureServiceByIdController,
            ],
            providers: [
                {
                    provide : AppHealthDeleteApplicationInfrastructureServiceByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthDeleteApplicationInfrastructureServiceByIdController>(AppHealthDeleteApplicationInfrastructureServiceByIdController);
        handler = module.get<AppHealthDeleteApplicationInfrastructureServiceByIdHandler>(AppHealthDeleteApplicationInfrastructureServiceByIdHandler);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteApplicationInfrastructureServiceByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an applicationInfrastructureService deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationInfrastructureServiceData[0])));
            expect(await controller.main(appHealthMockApplicationInfrastructureServiceData[0].id)).toBe(appHealthMockApplicationInfrastructureServiceData[0]);
        });
    });
});
