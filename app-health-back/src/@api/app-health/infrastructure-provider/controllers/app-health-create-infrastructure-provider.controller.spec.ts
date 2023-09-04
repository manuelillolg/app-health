import { AppHealthCreateInfrastructureProviderController, AppHealthCreateInfrastructureProviderHandler } from '@api/app-health/infrastructure-provider';
import { appHealthMockInfrastructureProviderData } from '@app/app-health/infrastructure-provider';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateInfrastructureProviderController', () =>
{
    let controller: AppHealthCreateInfrastructureProviderController;
    let handler: AppHealthCreateInfrastructureProviderHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthCreateInfrastructureProviderController,
            ],
            providers: [
                {
                    provide : AppHealthCreateInfrastructureProviderHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthCreateInfrastructureProviderController>(AppHealthCreateInfrastructureProviderController);
        handler = module.get<AppHealthCreateInfrastructureProviderHandler>(AppHealthCreateInfrastructureProviderHandler);
    });

    describe('main', () =>
    {
        test('AppHealthCreateInfrastructureProviderController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an infrastructureProvider created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockInfrastructureProviderData[0])));
            expect(
                await controller.main(
                    appHealthMockInfrastructureProviderData[0],
                ),
            )
                .toBe(appHealthMockInfrastructureProviderData[0]);
        });
    });
});
