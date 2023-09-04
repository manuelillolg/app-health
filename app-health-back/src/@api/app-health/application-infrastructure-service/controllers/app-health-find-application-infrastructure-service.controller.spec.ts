import { AppHealthFindApplicationInfrastructureServiceController, AppHealthFindApplicationInfrastructureServiceHandler } from '@api/app-health/application-infrastructure-service';
import { appHealthMockApplicationInfrastructureServiceData } from '@app/app-health/application-infrastructure-service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindApplicationInfrastructureServiceController', () =>
{
    let controller: AppHealthFindApplicationInfrastructureServiceController;
    let handler: AppHealthFindApplicationInfrastructureServiceHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthFindApplicationInfrastructureServiceController,
            ],
            providers: [
                {
                    provide : AppHealthFindApplicationInfrastructureServiceHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthFindApplicationInfrastructureServiceController>(AppHealthFindApplicationInfrastructureServiceController);
        handler = module.get<AppHealthFindApplicationInfrastructureServiceHandler>(AppHealthFindApplicationInfrastructureServiceHandler);
    });

    describe('main', () =>
    {
        test('AppHealthFindApplicationInfrastructureServiceController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a applicationInfrastructureService', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationInfrastructureServiceData[0])));
            expect(await controller.main()).toBe(appHealthMockApplicationInfrastructureServiceData[0]);
        });
    });
});
