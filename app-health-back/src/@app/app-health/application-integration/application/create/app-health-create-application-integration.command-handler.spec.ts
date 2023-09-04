import { AppHealthCreateApplicationIntegrationCommandHandler } from './app-health-create-application-integration.command-handler';
import { AppHealthCreateApplicationIntegrationService } from './app-health-create-application-integration.service';
import { AppHealthCreateApplicationIntegrationCommand, appHealthMockApplicationIntegrationData } from '@app/app-health/application-integration';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateApplicationIntegrationCommandHandler', () =>
{
    let commandHandler: AppHealthCreateApplicationIntegrationCommandHandler;
    let service: AppHealthCreateApplicationIntegrationService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateApplicationIntegrationCommandHandler,
                {
                    provide : AppHealthCreateApplicationIntegrationService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthCreateApplicationIntegrationCommandHandler>(AppHealthCreateApplicationIntegrationCommandHandler);
        service = module.get<AppHealthCreateApplicationIntegrationService>(AppHealthCreateApplicationIntegrationService);
    });

    describe('main', () =>
    {
        test('CreateApplicationIntegrationCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the AppHealthCreateApplicationIntegrationService', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthCreateApplicationIntegrationCommand(
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
