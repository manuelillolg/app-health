/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthDeleteApplicationIntegrationByIdController, AppHealthDeleteApplicationIntegrationByIdHandler } from '@api/app-health/application-integration';
import { appHealthMockApplicationIntegrationData } from '@app/app-health/application-integration';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteApplicationIntegrationByIdController', () =>
{
    let controller: AppHealthDeleteApplicationIntegrationByIdController;
    let handler: AppHealthDeleteApplicationIntegrationByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthDeleteApplicationIntegrationByIdController,
            ],
            providers: [
                {
                    provide : AppHealthDeleteApplicationIntegrationByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthDeleteApplicationIntegrationByIdController>(AppHealthDeleteApplicationIntegrationByIdController);
        handler = module.get<AppHealthDeleteApplicationIntegrationByIdHandler>(AppHealthDeleteApplicationIntegrationByIdHandler);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteApplicationIntegrationByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an applicationIntegration deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationIntegrationData[0])));
            expect(await controller.main(appHealthMockApplicationIntegrationData[0].id)).toBe(appHealthMockApplicationIntegrationData[0]);
        });
    });
});
