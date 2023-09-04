import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthDeleteApplicationAuthorizationsCommandHandler } from './app-health-delete-application-authorizations.command-handler';
import { AppHealthDeleteApplicationAuthorizationsCommand } from './app-health-delete-application-authorizations.command';
import { AppHealthDeleteApplicationAuthorizationsService } from './app-health-delete-application-authorizations.service';

describe('AppHealthDeleteApplicationAuthorizationsCommandHandler', () =>
{
    let commandHandler: AppHealthDeleteApplicationAuthorizationsCommandHandler;
    let service: AppHealthDeleteApplicationAuthorizationsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthDeleteApplicationAuthorizationsCommandHandler,
                {
                    provide : AppHealthDeleteApplicationAuthorizationsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthDeleteApplicationAuthorizationsCommandHandler>(AppHealthDeleteApplicationAuthorizationsCommandHandler);
        service = module.get<AppHealthDeleteApplicationAuthorizationsService>(AppHealthDeleteApplicationAuthorizationsService);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteApplicationAuthorizationsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthDeleteApplicationAuthorizationsCommand(),
            )).toBe(undefined);
        });
    });
});
