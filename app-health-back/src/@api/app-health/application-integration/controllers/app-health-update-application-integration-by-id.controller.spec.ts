import { AppHealthUpdateApplicationIntegrationByIdController, AppHealthUpdateApplicationIntegrationByIdHandler } from '@api/app-health/application-integration';
import { appHealthMockApplicationIntegrationData } from '@app/app-health/application-integration';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateApplicationIntegrationByIdController', () =>
{
    let controller: AppHealthUpdateApplicationIntegrationByIdController;
    let handler: AppHealthUpdateApplicationIntegrationByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthUpdateApplicationIntegrationByIdController,
            ],
            providers: [
                {
                    provide : AppHealthUpdateApplicationIntegrationByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthUpdateApplicationIntegrationByIdController>(AppHealthUpdateApplicationIntegrationByIdController);
        handler = module.get<AppHealthUpdateApplicationIntegrationByIdHandler>(AppHealthUpdateApplicationIntegrationByIdHandler);
    });

    describe('main', () =>
    {
        test('AppHealthUpdateApplicationIntegrationByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a applicationIntegration updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationIntegrationData[0])));
            expect(await controller.main(appHealthMockApplicationIntegrationData[0])).toBe(appHealthMockApplicationIntegrationData[0]);
        });
    });
});
