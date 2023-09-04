import { AppHealthFindApplicationIntegrationController, AppHealthFindApplicationIntegrationHandler } from '@api/app-health/application-integration';
import { appHealthMockApplicationIntegrationData } from '@app/app-health/application-integration';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindApplicationIntegrationController', () =>
{
    let controller: AppHealthFindApplicationIntegrationController;
    let handler: AppHealthFindApplicationIntegrationHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthFindApplicationIntegrationController,
            ],
            providers: [
                {
                    provide : AppHealthFindApplicationIntegrationHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthFindApplicationIntegrationController>(AppHealthFindApplicationIntegrationController);
        handler = module.get<AppHealthFindApplicationIntegrationHandler>(AppHealthFindApplicationIntegrationHandler);
    });

    describe('main', () =>
    {
        test('AppHealthFindApplicationIntegrationController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a applicationIntegration', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationIntegrationData[0])));
            expect(await controller.main()).toBe(appHealthMockApplicationIntegrationData[0]);
        });
    });
});
