import { AppHealthUpsertApplicationInfrastructureServiceController, AppHealthUpsertApplicationInfrastructureServiceHandler } from '@api/app-health/application-infrastructure-service';
import { appHealthMockApplicationInfrastructureServiceData } from '@app/app-health/application-infrastructure-service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpsertApplicationInfrastructureServiceController', () =>
{
    let controller: AppHealthUpsertApplicationInfrastructureServiceController;
    let handler: AppHealthUpsertApplicationInfrastructureServiceHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthUpsertApplicationInfrastructureServiceController,
            ],
            providers: [
                {
                    provide : AppHealthUpsertApplicationInfrastructureServiceHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthUpsertApplicationInfrastructureServiceController>(AppHealthUpsertApplicationInfrastructureServiceController);
        handler = module.get<AppHealthUpsertApplicationInfrastructureServiceHandler>(AppHealthUpsertApplicationInfrastructureServiceHandler);
    });

    describe('main', () =>
    {
        test('AppHealthUpsertApplicationInfrastructureServiceController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an applicationInfrastructureService upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationInfrastructureServiceData[0])));
            expect(await controller.main(appHealthMockApplicationInfrastructureServiceData[0])).toBe(appHealthMockApplicationInfrastructureServiceData[0]);
        });
    });
});
