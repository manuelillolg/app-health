import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthDeleteApplicationAuthenticationsCommandHandler } from './app-health-delete-application-authentications.command-handler';
import { AppHealthDeleteApplicationAuthenticationsCommand } from './app-health-delete-application-authentications.command';
import { AppHealthDeleteApplicationAuthenticationsService } from './app-health-delete-application-authentications.service';

describe('AppHealthDeleteApplicationAuthenticationsCommandHandler', () =>
{
    let commandHandler: AppHealthDeleteApplicationAuthenticationsCommandHandler;
    let service: AppHealthDeleteApplicationAuthenticationsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthDeleteApplicationAuthenticationsCommandHandler,
                {
                    provide : AppHealthDeleteApplicationAuthenticationsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthDeleteApplicationAuthenticationsCommandHandler>(AppHealthDeleteApplicationAuthenticationsCommandHandler);
        service = module.get<AppHealthDeleteApplicationAuthenticationsService>(AppHealthDeleteApplicationAuthenticationsService);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteApplicationAuthenticationsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthDeleteApplicationAuthenticationsCommand(),
            )).toBe(undefined);
        });
    });
});
