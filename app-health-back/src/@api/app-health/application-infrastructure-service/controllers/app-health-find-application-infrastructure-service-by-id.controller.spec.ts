import { AppHealthFindApplicationInfrastructureServiceByIdController, AppHealthFindApplicationInfrastructureServiceByIdHandler } from '@api/app-health/application-infrastructure-service';
import { appHealthMockApplicationInfrastructureServiceData } from '@app/app-health/application-infrastructure-service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindApplicationInfrastructureServiceByIdController', () =>
{
    let controller: AppHealthFindApplicationInfrastructureServiceByIdController;
    let handler: AppHealthFindApplicationInfrastructureServiceByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthFindApplicationInfrastructureServiceByIdController,
            ],
            providers: [
                {
                    provide : AppHealthFindApplicationInfrastructureServiceByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthFindApplicationInfrastructureServiceByIdController>(AppHealthFindApplicationInfrastructureServiceByIdController);
        handler = module.get<AppHealthFindApplicationInfrastructureServiceByIdHandler>(AppHealthFindApplicationInfrastructureServiceByIdHandler);
    });

    describe('main', () =>
    {
        test('AppHealthFindApplicationInfrastructureServiceByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an applicationInfrastructureService by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationInfrastructureServiceData[0])));
            expect(await controller.main(appHealthMockApplicationInfrastructureServiceData[0].id)).toBe(appHealthMockApplicationInfrastructureServiceData[0]);
        });
    });
});
