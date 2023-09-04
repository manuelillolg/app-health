import { AppHealthUpdateInfrastructureProviderByIdController, AppHealthUpdateInfrastructureProviderByIdHandler } from '@api/app-health/infrastructure-provider';
import { appHealthMockInfrastructureProviderData } from '@app/app-health/infrastructure-provider';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateInfrastructureProviderByIdController', () =>
{
    let controller: AppHealthUpdateInfrastructureProviderByIdController;
    let handler: AppHealthUpdateInfrastructureProviderByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthUpdateInfrastructureProviderByIdController,
            ],
            providers: [
                {
                    provide : AppHealthUpdateInfrastructureProviderByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthUpdateInfrastructureProviderByIdController>(AppHealthUpdateInfrastructureProviderByIdController);
        handler = module.get<AppHealthUpdateInfrastructureProviderByIdHandler>(AppHealthUpdateInfrastructureProviderByIdHandler);
    });

    describe('main', () =>
    {
        test('AppHealthUpdateInfrastructureProviderByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a infrastructureProvider updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockInfrastructureProviderData[0])));
            expect(await controller.main(appHealthMockInfrastructureProviderData[0])).toBe(appHealthMockInfrastructureProviderData[0]);
        });
    });
});
