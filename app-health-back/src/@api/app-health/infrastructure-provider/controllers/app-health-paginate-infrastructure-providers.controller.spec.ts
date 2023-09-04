import { AppHealthPaginateInfrastructureProvidersController, AppHealthPaginateInfrastructureProvidersHandler } from '@api/app-health/infrastructure-provider';
import { appHealthMockInfrastructureProviderData } from '@app/app-health/infrastructure-provider';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthPaginateInfrastructureProvidersController', () =>
{
    let controller: AppHealthPaginateInfrastructureProvidersController;
    let handler: AppHealthPaginateInfrastructureProvidersHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthPaginateInfrastructureProvidersController,
            ],
            providers: [
                {
                    provide : AppHealthPaginateInfrastructureProvidersHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthPaginateInfrastructureProvidersController>(AppHealthPaginateInfrastructureProvidersController);
        handler = module.get<AppHealthPaginateInfrastructureProvidersHandler>(AppHealthPaginateInfrastructureProvidersHandler);
    });

    describe('main', () =>
    {
        test('AppHealthPaginateInfrastructureProvidersController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a appHealthMockInfrastructureProviderData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : appHealthMockInfrastructureProviderData,
            })));
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : appHealthMockInfrastructureProviderData,
            });
        });
    });
});
