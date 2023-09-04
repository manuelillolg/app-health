/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockApplicationIntegrationData } from '@app/app-health/application-integration/infrastructure/mock/app-health-mock-application-integration.data';
import { AppHealthCreateApplicationIntegrationsCommandHandler } from './app-health-create-application-integrations.command-handler';
import { AppHealthCreateApplicationIntegrationsCommand } from './app-health-create-application-integrations.command';
import { AppHealthCreateApplicationIntegrationsService } from './app-health-create-application-integrations.service';

describe('appHealthCreateApplicationIntegrationsCommandHandler', () =>
{
    let commandHandler: AppHealthCreateApplicationIntegrationsCommandHandler;
    let service: AppHealthCreateApplicationIntegrationsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateApplicationIntegrationsCommandHandler,
                {
                    provide : AppHealthCreateApplicationIntegrationsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthCreateApplicationIntegrationsCommandHandler>(AppHealthCreateApplicationIntegrationsCommandHandler);
        service = module.get<AppHealthCreateApplicationIntegrationsService>(AppHealthCreateApplicationIntegrationsService);
    });

    describe('main', () =>
    {
        test('AppHealthCreateApplicationIntegrationsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return AppHealthMockApplicationIntegrationData createds', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthCreateApplicationIntegrationsCommand(
                    appHealthMockApplicationIntegrationData,
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
