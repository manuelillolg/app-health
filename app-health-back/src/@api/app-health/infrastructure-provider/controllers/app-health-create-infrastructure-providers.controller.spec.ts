import { AppHealthCreateInfrastructureProvidersController, AppHealthCreateInfrastructureProvidersHandler } from '@api/app-health/infrastructure-provider';
import { appHealthMockInfrastructureProviderData } from '@app/app-health/infrastructure-provider';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateInfrastructureProvidersController', () =>
{
    let controller: AppHealthCreateInfrastructureProvidersController;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                AppHealthCreateInfrastructureProvidersController,
            ],
            providers: [
                {
                    provide : AppHealthCreateInfrastructureProvidersHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthCreateInfrastructureProvidersController>(AppHealthCreateInfrastructureProvidersController);
    });

    describe('main', () =>
    {
        test('AppHealthCreateInfrastructureProvidersController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an appHealthMockInfrastructureProviderData created', async () =>
        {
            expect(
                await controller.main(
                    appHealthMockInfrastructureProviderData,
                ),
            )
                .toBe(undefined);
        });
    });
});
