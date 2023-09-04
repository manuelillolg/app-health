import { AppHealthDeleteApplicationIntegrationsController, AppHealthDeleteApplicationIntegrationsHandler } from '@api/app-health/application-integration';
import { appHealthMockApplicationIntegrationData } from '@app/app-health/application-integration';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteApplicationIntegrationsController', () =>
{
    let controller: AppHealthDeleteApplicationIntegrationsController;
    let handler: AppHealthDeleteApplicationIntegrationsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthDeleteApplicationIntegrationsController,
            ],
            providers: [
                {
                    provide : AppHealthDeleteApplicationIntegrationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthDeleteApplicationIntegrationsController>(AppHealthDeleteApplicationIntegrationsController);
        handler = module.get<AppHealthDeleteApplicationIntegrationsHandler>(AppHealthDeleteApplicationIntegrationsHandler);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteApplicationIntegrationsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an appHealthMockApplicationIntegrationData deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationIntegrationData)));
            expect(await controller.main()).toBe(appHealthMockApplicationIntegrationData);
        });
    });
});
