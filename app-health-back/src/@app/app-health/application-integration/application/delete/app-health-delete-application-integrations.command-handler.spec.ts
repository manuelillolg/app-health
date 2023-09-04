import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthDeleteApplicationIntegrationsCommandHandler } from './app-health-delete-application-integrations.command-handler';
import { AppHealthDeleteApplicationIntegrationsCommand } from './app-health-delete-application-integrations.command';
import { AppHealthDeleteApplicationIntegrationsService } from './app-health-delete-application-integrations.service';

describe('AppHealthDeleteApplicationIntegrationsCommandHandler', () =>
{
    let commandHandler: AppHealthDeleteApplicationIntegrationsCommandHandler;
    let service: AppHealthDeleteApplicationIntegrationsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthDeleteApplicationIntegrationsCommandHandler,
                {
                    provide : AppHealthDeleteApplicationIntegrationsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthDeleteApplicationIntegrationsCommandHandler>(AppHealthDeleteApplicationIntegrationsCommandHandler);
        service = module.get<AppHealthDeleteApplicationIntegrationsService>(AppHealthDeleteApplicationIntegrationsService);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteApplicationIntegrationsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthDeleteApplicationIntegrationsCommand(),
            )).toBe(undefined);
        });
    });
});
