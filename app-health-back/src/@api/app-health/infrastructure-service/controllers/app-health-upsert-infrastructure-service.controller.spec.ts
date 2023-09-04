import { AppHealthUpsertInfrastructureServiceController, AppHealthUpsertInfrastructureServiceHandler } from '@api/app-health/infrastructure-service';
import { appHealthMockInfrastructureServiceData } from '@app/app-health/infrastructure-service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpsertInfrastructureServiceController', () =>
{
    let controller: AppHealthUpsertInfrastructureServiceController;
    let handler: AppHealthUpsertInfrastructureServiceHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthUpsertInfrastructureServiceController,
            ],
            providers: [
                {
                    provide : AppHealthUpsertInfrastructureServiceHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthUpsertInfrastructureServiceController>(AppHealthUpsertInfrastructureServiceController);
        handler = module.get<AppHealthUpsertInfrastructureServiceHandler>(AppHealthUpsertInfrastructureServiceHandler);
    });

    describe('main', () =>
    {
        test('AppHealthUpsertInfrastructureServiceController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an infrastructureService upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockInfrastructureServiceData[0])));
            expect(await controller.main(appHealthMockInfrastructureServiceData[0])).toBe(appHealthMockInfrastructureServiceData[0]);
        });
    });
});
