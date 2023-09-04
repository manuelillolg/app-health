import { AppHealthGetApplicationIntegrationsController, AppHealthGetApplicationIntegrationsHandler } from '@api/app-health/application-integration';
import { appHealthMockApplicationIntegrationData } from '@app/app-health/application-integration';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthGetApplicationIntegrationsController', () =>
{
    let controller: AppHealthGetApplicationIntegrationsController;
    let handler: AppHealthGetApplicationIntegrationsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthGetApplicationIntegrationsController,
            ],
            providers: [
                {
                    provide : AppHealthGetApplicationIntegrationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthGetApplicationIntegrationsController>(AppHealthGetApplicationIntegrationsController);
        handler = module.get<AppHealthGetApplicationIntegrationsHandler>(AppHealthGetApplicationIntegrationsHandler);
    });

    describe('main', () =>
    {
        test('AppHealthGetApplicationIntegrationsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a appHealthMockApplicationIntegrationData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationIntegrationData)));
            expect(await controller.main()).toBe(appHealthMockApplicationIntegrationData);
        });
    });
});
