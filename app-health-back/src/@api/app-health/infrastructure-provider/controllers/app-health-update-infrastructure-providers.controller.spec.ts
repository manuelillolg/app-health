import { AppHealthUpdateInfrastructureProvidersController, AppHealthUpdateInfrastructureProvidersHandler } from '@api/app-health/infrastructure-provider';
import { appHealthMockInfrastructureProviderData } from '@app/app-health/infrastructure-provider';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateInfrastructureProvidersController', () =>
{
    let controller: AppHealthUpdateInfrastructureProvidersController;
    let handler: AppHealthUpdateInfrastructureProvidersHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthUpdateInfrastructureProvidersController,
            ],
            providers: [
                {
                    provide : AppHealthUpdateInfrastructureProvidersHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthUpdateInfrastructureProvidersController>(AppHealthUpdateInfrastructureProvidersController);
        handler = module.get<AppHealthUpdateInfrastructureProvidersHandler>(AppHealthUpdateInfrastructureProvidersHandler);
    });

    describe('main', () =>
    {
        test('AppHealthUpdateInfrastructureProvidersController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a infrastructureProviders updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockInfrastructureProviderData[0])));
            expect(await controller.main(appHealthMockInfrastructureProviderData[0])).toBe(appHealthMockInfrastructureProviderData[0]);
        });
    });
});
