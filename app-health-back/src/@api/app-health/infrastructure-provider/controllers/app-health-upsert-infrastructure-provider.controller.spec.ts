import { AppHealthUpsertInfrastructureProviderController, AppHealthUpsertInfrastructureProviderHandler } from '@api/app-health/infrastructure-provider';
import { appHealthMockInfrastructureProviderData } from '@app/app-health/infrastructure-provider';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpsertInfrastructureProviderController', () =>
{
    let controller: AppHealthUpsertInfrastructureProviderController;
    let handler: AppHealthUpsertInfrastructureProviderHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthUpsertInfrastructureProviderController,
            ],
            providers: [
                {
                    provide : AppHealthUpsertInfrastructureProviderHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthUpsertInfrastructureProviderController>(AppHealthUpsertInfrastructureProviderController);
        handler = module.get<AppHealthUpsertInfrastructureProviderHandler>(AppHealthUpsertInfrastructureProviderHandler);
    });

    describe('main', () =>
    {
        test('AppHealthUpsertInfrastructureProviderController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an infrastructureProvider upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockInfrastructureProviderData[0])));
            expect(await controller.main(appHealthMockInfrastructureProviderData[0])).toBe(appHealthMockInfrastructureProviderData[0]);
        });
    });
});
