import { AppHealthFindInfrastructureServiceByIdController, AppHealthFindInfrastructureServiceByIdHandler } from '@api/app-health/infrastructure-service';
import { appHealthMockInfrastructureServiceData } from '@app/app-health/infrastructure-service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindInfrastructureServiceByIdController', () =>
{
    let controller: AppHealthFindInfrastructureServiceByIdController;
    let handler: AppHealthFindInfrastructureServiceByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthFindInfrastructureServiceByIdController,
            ],
            providers: [
                {
                    provide : AppHealthFindInfrastructureServiceByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthFindInfrastructureServiceByIdController>(AppHealthFindInfrastructureServiceByIdController);
        handler = module.get<AppHealthFindInfrastructureServiceByIdHandler>(AppHealthFindInfrastructureServiceByIdHandler);
    });

    describe('main', () =>
    {
        test('AppHealthFindInfrastructureServiceByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an infrastructureService by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockInfrastructureServiceData[0])));
            expect(await controller.main(appHealthMockInfrastructureServiceData[0].id)).toBe(appHealthMockInfrastructureServiceData[0]);
        });
    });
});
