import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockApplicationIntegrationData } from '@app/app-health/application-integration/infrastructure/mock/app-health-mock-application-integration.data';
import { AppHealthUpdateApplicationIntegrationByIdCommandHandler } from './app-health-update-application-integration-by-id.command-handler';
import { AppHealthUpdateApplicationIntegrationByIdCommand } from './app-health-update-application-integration-by-id.command';
import { AppHealthUpdateApplicationIntegrationByIdService } from './app-health-update-application-integration-by-id.service';

describe('AppHealthUpdateApplicationIntegrationByIdCommandHandler', () =>
{
    let commandHandler: AppHealthUpdateApplicationIntegrationByIdCommandHandler;
    let service: AppHealthUpdateApplicationIntegrationByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthUpdateApplicationIntegrationByIdCommandHandler,
                {
                    provide : AppHealthUpdateApplicationIntegrationByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthUpdateApplicationIntegrationByIdCommandHandler>(AppHealthUpdateApplicationIntegrationByIdCommandHandler);
        service = module.get<AppHealthUpdateApplicationIntegrationByIdService>(AppHealthUpdateApplicationIntegrationByIdService);
    });

    describe('main', () =>
    {
        test('UpdateApplicationIntegrationByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an applicationIntegration created', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthUpdateApplicationIntegrationByIdCommand(
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
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
