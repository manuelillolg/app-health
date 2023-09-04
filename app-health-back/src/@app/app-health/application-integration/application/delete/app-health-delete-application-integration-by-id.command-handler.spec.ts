import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthDeleteApplicationIntegrationByIdCommandHandler } from './app-health-delete-application-integration-by-id.command-handler';
import { appHealthMockApplicationIntegrationData } from '@app/app-health/application-integration/infrastructure/mock/app-health-mock-application-integration.data';
import { AppHealthDeleteApplicationIntegrationByIdCommand } from './app-health-delete-application-integration-by-id.command';
import { AppHealthDeleteApplicationIntegrationByIdService } from './app-health-delete-application-integration-by-id.service';

describe('AppHealthDeleteApplicationIntegrationByIdCommandHandler', () =>
{
    let commandHandler: AppHealthDeleteApplicationIntegrationByIdCommandHandler;
    let service: AppHealthDeleteApplicationIntegrationByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthDeleteApplicationIntegrationByIdCommandHandler,
                {
                    provide : AppHealthDeleteApplicationIntegrationByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthDeleteApplicationIntegrationByIdCommandHandler>(AppHealthDeleteApplicationIntegrationByIdCommandHandler);
        service = module.get<AppHealthDeleteApplicationIntegrationByIdService>(AppHealthDeleteApplicationIntegrationByIdService);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteApplicationIntegrationByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the AppHealthDeleteApplicationIntegrationByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthDeleteApplicationIntegrationByIdCommand(
                    appHealthMockApplicationIntegrationData[0].id,
                ),
            )).toBe(undefined);
        });
    });
});
