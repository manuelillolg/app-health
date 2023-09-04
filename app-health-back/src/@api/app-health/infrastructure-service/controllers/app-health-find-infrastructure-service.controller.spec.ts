import { AppHealthFindInfrastructureServiceController, AppHealthFindInfrastructureServiceHandler } from '@api/app-health/infrastructure-service';
import { appHealthMockInfrastructureServiceData } from '@app/app-health/infrastructure-service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindInfrastructureServiceController', () =>
{
    let controller: AppHealthFindInfrastructureServiceController;
    let handler: AppHealthFindInfrastructureServiceHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthFindInfrastructureServiceController,
            ],
            providers: [
                {
                    provide : AppHealthFindInfrastructureServiceHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthFindInfrastructureServiceController>(AppHealthFindInfrastructureServiceController);
        handler = module.get<AppHealthFindInfrastructureServiceHandler>(AppHealthFindInfrastructureServiceHandler);
    });

    describe('main', () =>
    {
        test('AppHealthFindInfrastructureServiceController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a infrastructureService', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockInfrastructureServiceData[0])));
            expect(await controller.main()).toBe(appHealthMockInfrastructureServiceData[0]);
        });
    });
});
