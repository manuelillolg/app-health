import { AppHealthUpdateApplicationIntegrationsController, AppHealthUpdateApplicationIntegrationsHandler } from '@api/app-health/application-integration';
import { appHealthMockApplicationIntegrationData } from '@app/app-health/application-integration';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateApplicationIntegrationsController', () =>
{
    let controller: AppHealthUpdateApplicationIntegrationsController;
    let handler: AppHealthUpdateApplicationIntegrationsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthUpdateApplicationIntegrationsController,
            ],
            providers: [
                {
                    provide : AppHealthUpdateApplicationIntegrationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthUpdateApplicationIntegrationsController>(AppHealthUpdateApplicationIntegrationsController);
        handler = module.get<AppHealthUpdateApplicationIntegrationsHandler>(AppHealthUpdateApplicationIntegrationsHandler);
    });

    describe('main', () =>
    {
        test('AppHealthUpdateApplicationIntegrationsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a applicationIntegrations updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationIntegrationData[0])));
            expect(await controller.main(appHealthMockApplicationIntegrationData[0])).toBe(appHealthMockApplicationIntegrationData[0]);
        });
    });
});
