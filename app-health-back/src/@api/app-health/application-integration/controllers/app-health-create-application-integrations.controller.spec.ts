import { AppHealthCreateApplicationIntegrationsController, AppHealthCreateApplicationIntegrationsHandler } from '@api/app-health/application-integration';
import { appHealthMockApplicationIntegrationData } from '@app/app-health/application-integration';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateApplicationIntegrationsController', () =>
{
    let controller: AppHealthCreateApplicationIntegrationsController;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                AppHealthCreateApplicationIntegrationsController,
            ],
            providers: [
                {
                    provide : AppHealthCreateApplicationIntegrationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthCreateApplicationIntegrationsController>(AppHealthCreateApplicationIntegrationsController);
    });

    describe('main', () =>
    {
        test('AppHealthCreateApplicationIntegrationsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an appHealthMockApplicationIntegrationData created', async () =>
        {
            expect(
                await controller.main(
                    appHealthMockApplicationIntegrationData,
                ),
            )
                .toBe(undefined);
        });
    });
});
