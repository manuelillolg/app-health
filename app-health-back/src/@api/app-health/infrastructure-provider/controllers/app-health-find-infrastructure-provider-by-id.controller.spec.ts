import { AppHealthFindInfrastructureProviderByIdController, AppHealthFindInfrastructureProviderByIdHandler } from '@api/app-health/infrastructure-provider';
import { appHealthMockInfrastructureProviderData } from '@app/app-health/infrastructure-provider';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindInfrastructureProviderByIdController', () =>
{
    let controller: AppHealthFindInfrastructureProviderByIdController;
    let handler: AppHealthFindInfrastructureProviderByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthFindInfrastructureProviderByIdController,
            ],
            providers: [
                {
                    provide : AppHealthFindInfrastructureProviderByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthFindInfrastructureProviderByIdController>(AppHealthFindInfrastructureProviderByIdController);
        handler = module.get<AppHealthFindInfrastructureProviderByIdHandler>(AppHealthFindInfrastructureProviderByIdHandler);
    });

    describe('main', () =>
    {
        test('AppHealthFindInfrastructureProviderByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an infrastructureProvider by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockInfrastructureProviderData[0])));
            expect(await controller.main(appHealthMockInfrastructureProviderData[0].id)).toBe(appHealthMockInfrastructureProviderData[0]);
        });
    });
});
