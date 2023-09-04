import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthDeleteApplicationLanguagesCommandHandler } from './app-health-delete-application-languages.command-handler';
import { AppHealthDeleteApplicationLanguagesCommand } from './app-health-delete-application-languages.command';
import { AppHealthDeleteApplicationLanguagesService } from './app-health-delete-application-languages.service';

describe('AppHealthDeleteApplicationLanguagesCommandHandler', () =>
{
    let commandHandler: AppHealthDeleteApplicationLanguagesCommandHandler;
    let service: AppHealthDeleteApplicationLanguagesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthDeleteApplicationLanguagesCommandHandler,
                {
                    provide : AppHealthDeleteApplicationLanguagesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthDeleteApplicationLanguagesCommandHandler>(AppHealthDeleteApplicationLanguagesCommandHandler);
        service = module.get<AppHealthDeleteApplicationLanguagesService>(AppHealthDeleteApplicationLanguagesService);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteApplicationLanguagesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthDeleteApplicationLanguagesCommand(),
            )).toBe(undefined);
        });
    });
});
