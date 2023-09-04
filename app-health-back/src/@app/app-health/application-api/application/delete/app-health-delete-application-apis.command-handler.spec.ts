import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthDeleteApplicationApisCommandHandler } from './app-health-delete-application-apis.command-handler';
import { AppHealthDeleteApplicationApisCommand } from './app-health-delete-application-apis.command';
import { AppHealthDeleteApplicationApisService } from './app-health-delete-application-apis.service';

describe('AppHealthDeleteApplicationApisCommandHandler', () =>
{
    let commandHandler: AppHealthDeleteApplicationApisCommandHandler;
    let service: AppHealthDeleteApplicationApisService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthDeleteApplicationApisCommandHandler,
                {
                    provide : AppHealthDeleteApplicationApisService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthDeleteApplicationApisCommandHandler>(AppHealthDeleteApplicationApisCommandHandler);
        service = module.get<AppHealthDeleteApplicationApisService>(AppHealthDeleteApplicationApisService);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteApplicationApisCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthDeleteApplicationApisCommand(),
            )).toBe(undefined);
        });
    });
});
