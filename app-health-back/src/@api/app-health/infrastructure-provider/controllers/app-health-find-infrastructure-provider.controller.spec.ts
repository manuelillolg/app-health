import { AppHealthFindInfrastructureProviderController, AppHealthFindInfrastructureProviderHandler } from '@api/app-health/infrastructure-provider';
import { appHealthMockInfrastructureProviderData } from '@app/app-health/infrastructure-provider';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindInfrastructureProviderController', () =>
{
    let controller: AppHealthFindInfrastructureProviderController;
    let handler: AppHealthFindInfrastructureProviderHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthFindInfrastructureProviderController,
            ],
            providers: [
                {
                    provide : AppHealthFindInfrastructureProviderHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthFindInfrastructureProviderController>(AppHealthFindInfrastructureProviderController);
        handler = module.get<AppHealthFindInfrastructureProviderHandler>(AppHealthFindInfrastructureProviderHandler);
    });

    describe('main', () =>
    {
        test('AppHealthFindInfrastructureProviderController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a infrastructureProvider', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockInfrastructureProviderData[0])));
            expect(await controller.main()).toBe(appHealthMockInfrastructureProviderData[0]);
        });
    });
});
