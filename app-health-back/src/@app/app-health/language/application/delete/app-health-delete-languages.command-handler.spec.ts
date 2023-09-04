import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthDeleteLanguagesCommandHandler } from './app-health-delete-languages.command-handler';
import { AppHealthDeleteLanguagesCommand } from './app-health-delete-languages.command';
import { AppHealthDeleteLanguagesService } from './app-health-delete-languages.service';

describe('AppHealthDeleteLanguagesCommandHandler', () =>
{
    let commandHandler: AppHealthDeleteLanguagesCommandHandler;
    let service: AppHealthDeleteLanguagesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthDeleteLanguagesCommandHandler,
                {
                    provide : AppHealthDeleteLanguagesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthDeleteLanguagesCommandHandler>(AppHealthDeleteLanguagesCommandHandler);
        service = module.get<AppHealthDeleteLanguagesService>(AppHealthDeleteLanguagesService);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteLanguagesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthDeleteLanguagesCommand(),
            )).toBe(undefined);
        });
    });
});
