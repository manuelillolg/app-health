import { AppHealthGetInfrastructureProvidersController, AppHealthGetInfrastructureProvidersHandler } from '@api/app-health/infrastructure-provider';
import { appHealthMockInfrastructureProviderData } from '@app/app-health/infrastructure-provider';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthGetInfrastructureProvidersController', () =>
{
    let controller: AppHealthGetInfrastructureProvidersController;
    let handler: AppHealthGetInfrastructureProvidersHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthGetInfrastructureProvidersController,
            ],
            providers: [
                {
                    provide : AppHealthGetInfrastructureProvidersHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthGetInfrastructureProvidersController>(AppHealthGetInfrastructureProvidersController);
        handler = module.get<AppHealthGetInfrastructureProvidersHandler>(AppHealthGetInfrastructureProvidersHandler);
    });

    describe('main', () =>
    {
        test('AppHealthGetInfrastructureProvidersController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a appHealthMockInfrastructureProviderData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockInfrastructureProviderData)));
            expect(await controller.main()).toBe(appHealthMockInfrastructureProviderData);
        });
    });
});
