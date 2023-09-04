/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthDeleteInfrastructureServiceByIdController, AppHealthDeleteInfrastructureServiceByIdHandler } from '@api/app-health/infrastructure-service';
import { appHealthMockInfrastructureServiceData } from '@app/app-health/infrastructure-service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteInfrastructureServiceByIdController', () =>
{
    let controller: AppHealthDeleteInfrastructureServiceByIdController;
    let handler: AppHealthDeleteInfrastructureServiceByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthDeleteInfrastructureServiceByIdController,
            ],
            providers: [
                {
                    provide : AppHealthDeleteInfrastructureServiceByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthDeleteInfrastructureServiceByIdController>(AppHealthDeleteInfrastructureServiceByIdController);
        handler = module.get<AppHealthDeleteInfrastructureServiceByIdHandler>(AppHealthDeleteInfrastructureServiceByIdHandler);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteInfrastructureServiceByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an infrastructureService deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockInfrastructureServiceData[0])));
            expect(await controller.main(appHealthMockInfrastructureServiceData[0].id)).toBe(appHealthMockInfrastructureServiceData[0]);
        });
    });
});
