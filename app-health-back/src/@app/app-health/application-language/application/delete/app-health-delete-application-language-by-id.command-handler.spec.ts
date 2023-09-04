import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthDeleteApplicationLanguageByIdCommandHandler } from './app-health-delete-application-language-by-id.command-handler';
import { appHealthMockApplicationLanguageData } from '@app/app-health/application-language/infrastructure/mock/app-health-mock-application-language.data';
import { AppHealthDeleteApplicationLanguageByIdCommand } from './app-health-delete-application-language-by-id.command';
import { AppHealthDeleteApplicationLanguageByIdService } from './app-health-delete-application-language-by-id.service';

describe('AppHealthDeleteApplicationLanguageByIdCommandHandler', () =>
{
    let commandHandler: AppHealthDeleteApplicationLanguageByIdCommandHandler;
    let service: AppHealthDeleteApplicationLanguageByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthDeleteApplicationLanguageByIdCommandHandler,
                {
                    provide : AppHealthDeleteApplicationLanguageByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthDeleteApplicationLanguageByIdCommandHandler>(AppHealthDeleteApplicationLanguageByIdCommandHandler);
        service = module.get<AppHealthDeleteApplicationLanguageByIdService>(AppHealthDeleteApplicationLanguageByIdService);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteApplicationLanguageByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the AppHealthDeleteApplicationLanguageByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthDeleteApplicationLanguageByIdCommand(
                    appHealthMockApplicationLanguageData[0].id,
                ),
            )).toBe(undefined);
        });
    });
});
