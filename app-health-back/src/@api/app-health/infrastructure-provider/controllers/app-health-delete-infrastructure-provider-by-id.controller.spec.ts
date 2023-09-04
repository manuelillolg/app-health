/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthDeleteInfrastructureProviderByIdController, AppHealthDeleteInfrastructureProviderByIdHandler } from '@api/app-health/infrastructure-provider';
import { appHealthMockInfrastructureProviderData } from '@app/app-health/infrastructure-provider';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteInfrastructureProviderByIdController', () =>
{
    let controller: AppHealthDeleteInfrastructureProviderByIdController;
    let handler: AppHealthDeleteInfrastructureProviderByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthDeleteInfrastructureProviderByIdController,
            ],
            providers: [
                {
                    provide : AppHealthDeleteInfrastructureProviderByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthDeleteInfrastructureProviderByIdController>(AppHealthDeleteInfrastructureProviderByIdController);
        handler = module.get<AppHealthDeleteInfrastructureProviderByIdHandler>(AppHealthDeleteInfrastructureProviderByIdHandler);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteInfrastructureProviderByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an infrastructureProvider deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockInfrastructureProviderData[0])));
            expect(await controller.main(appHealthMockInfrastructureProviderData[0].id)).toBe(appHealthMockInfrastructureProviderData[0]);
        });
    });
});
