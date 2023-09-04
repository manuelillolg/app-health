import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockApplicationIntegrationData } from '@app/app-health/application-integration/infrastructure/mock/app-health-mock-application-integration.data';
import { AppHealthUpsertApplicationIntegrationCommandHandler } from './app-health-upsert-application-integration.command-handler';
import { AppHealthUpsertApplicationIntegrationCommand } from './app-health-upsert-application-integration.command';
import { AppHealthUpsertApplicationIntegrationService } from './app-health-upsert-application-integration.service';

describe('AppHealthUpsertApplicationIntegrationCommandHandler', () =>
{
    let commandHandler: AppHealthUpsertApplicationIntegrationCommandHandler;
    let service: AppHealthUpsertApplicationIntegrationService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthUpsertApplicationIntegrationCommandHandler,
                {
                    provide : AppHealthUpsertApplicationIntegrationService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthUpsertApplicationIntegrationCommandHandler>(AppHealthUpsertApplicationIntegrationCommandHandler);
        service = module.get<AppHealthUpsertApplicationIntegrationService>(AppHealthUpsertApplicationIntegrationService);
    });

    describe('main', () =>
    {
        test('UpsertApplicationIntegrationCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the AppHealthUpsertApplicationIntegrationService', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthUpsertApplicationIntegrationCommand(
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
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
