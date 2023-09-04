import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthDeleteLanguageByIdCommandHandler } from './app-health-delete-language-by-id.command-handler';
import { appHealthMockLanguageData } from '@app/app-health/language/infrastructure/mock/app-health-mock-language.data';
import { AppHealthDeleteLanguageByIdCommand } from './app-health-delete-language-by-id.command';
import { AppHealthDeleteLanguageByIdService } from './app-health-delete-language-by-id.service';

describe('AppHealthDeleteLanguageByIdCommandHandler', () =>
{
    let commandHandler: AppHealthDeleteLanguageByIdCommandHandler;
    let service: AppHealthDeleteLanguageByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthDeleteLanguageByIdCommandHandler,
                {
                    provide : AppHealthDeleteLanguageByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthDeleteLanguageByIdCommandHandler>(AppHealthDeleteLanguageByIdCommandHandler);
        service = module.get<AppHealthDeleteLanguageByIdService>(AppHealthDeleteLanguageByIdService);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteLanguageByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the AppHealthDeleteLanguageByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthDeleteLanguageByIdCommand(
                    appHealthMockLanguageData[0].id,
                ),
            )).toBe(undefined);
        });
    });
});
