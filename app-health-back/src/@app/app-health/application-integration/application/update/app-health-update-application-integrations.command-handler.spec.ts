import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockApplicationIntegrationData } from '@app/app-health/application-integration/infrastructure/mock/app-health-mock-application-integration.data';
import { AppHealthUpdateApplicationIntegrationsCommandHandler } from './app-health-update-application-integrations.command-handler';
import { AppHealthUpdateApplicationIntegrationsCommand } from './app-health-update-application-integrations.command';
import { AppHealthUpdateApplicationIntegrationsService } from './app-health-update-application-integrations.service';

describe('AppHealthUpdateApplicationIntegrationsCommandHandler', () =>
{
    let commandHandler: AppHealthUpdateApplicationIntegrationsCommandHandler;
    let service: AppHealthUpdateApplicationIntegrationsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthUpdateApplicationIntegrationsCommandHandler,
                {
                    provide : AppHealthUpdateApplicationIntegrationsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthUpdateApplicationIntegrationsCommandHandler>(AppHealthUpdateApplicationIntegrationsCommandHandler);
        service = module.get<AppHealthUpdateApplicationIntegrationsService>(AppHealthUpdateApplicationIntegrationsService);
    });

    describe('main', () =>
    {
        test('UpdateApplicationIntegrationsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an applicationIntegrations updated', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthUpdateApplicationIntegrationsCommand(
                    {
                        id: appHealthMockApplicationIntegrationData[0].id,
                        name: appHealthMockApplicationIntegrationData[0].name,
                        description: appHealthMockApplicationIntegrationData[0].description,
                        sourceApplicationId: appHealthMockApplicationIntegrationData[0].sourceApplicationId,
                        targetApplicationId: appHealthMockApplicationIntegrationData[0].targetApplicationId,
                        apiInterfaceTypeId: appHealthMockApplicationIntegrationData[0].apiInterfaceTypeId,
                        interfaceNumbers: appHealthMockApplicationIntegrationData[0].interfaceNumbers,
                        modality: appHealthMockApplicationIntegrationData[0].modality,
                        score: appHealthMockApplicationIntegrationData[0].score,
                        documentations: appHealthMockApplicationIntegrationData[0].documentations,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
