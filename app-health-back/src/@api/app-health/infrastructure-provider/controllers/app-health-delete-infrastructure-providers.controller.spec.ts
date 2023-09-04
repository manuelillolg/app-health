import { AppHealthDeleteInfrastructureProvidersController, AppHealthDeleteInfrastructureProvidersHandler } from '@api/app-health/infrastructure-provider';
import { appHealthMockInfrastructureProviderData } from '@app/app-health/infrastructure-provider';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteInfrastructureProvidersController', () =>
{
    let controller: AppHealthDeleteInfrastructureProvidersController;
    let handler: AppHealthDeleteInfrastructureProvidersHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthDeleteInfrastructureProvidersController,
            ],
            providers: [
                {
                    provide : AppHealthDeleteInfrastructureProvidersHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthDeleteInfrastructureProvidersController>(AppHealthDeleteInfrastructureProvidersController);
        handler = module.get<AppHealthDeleteInfrastructureProvidersHandler>(AppHealthDeleteInfrastructureProvidersHandler);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteInfrastructureProvidersController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an appHealthMockInfrastructureProviderData deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockInfrastructureProviderData)));
            expect(await controller.main()).toBe(appHealthMockInfrastructureProviderData);
        });
    });
});
