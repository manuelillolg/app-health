import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockLanguageData } from '@app/app-health/language/infrastructure/mock/app-health-mock-language.data';
import { AppHealthUpdateLanguagesCommandHandler } from './app-health-update-languages.command-handler';
import { AppHealthUpdateLanguagesCommand } from './app-health-update-languages.command';
import { AppHealthUpdateLanguagesService } from './app-health-update-languages.service';

describe('AppHealthUpdateLanguagesCommandHandler', () =>
{
    let commandHandler: AppHealthUpdateLanguagesCommandHandler;
    let service: AppHealthUpdateLanguagesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthUpdateLanguagesCommandHandler,
                {
                    provide : AppHealthUpdateLanguagesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthUpdateLanguagesCommandHandler>(AppHealthUpdateLanguagesCommandHandler);
        service = module.get<AppHealthUpdateLanguagesService>(AppHealthUpdateLanguagesService);
    });

    describe('main', () =>
    {
        test('UpdateLanguagesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an languages updated', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthUpdateLanguagesCommand(
                    {
                        id: appHealthMockLanguageData[0].id,
                        name: appHealthMockLanguageData[0].name,
                        versions: appHealthMockLanguageData[0].versions,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
