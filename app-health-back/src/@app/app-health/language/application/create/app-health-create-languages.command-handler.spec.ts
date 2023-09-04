/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockLanguageData } from '@app/app-health/language/infrastructure/mock/app-health-mock-language.data';
import { AppHealthCreateLanguagesCommandHandler } from './app-health-create-languages.command-handler';
import { AppHealthCreateLanguagesCommand } from './app-health-create-languages.command';
import { AppHealthCreateLanguagesService } from './app-health-create-languages.service';

describe('appHealthCreateLanguagesCommandHandler', () =>
{
    let commandHandler: AppHealthCreateLanguagesCommandHandler;
    let service: AppHealthCreateLanguagesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateLanguagesCommandHandler,
                {
                    provide : AppHealthCreateLanguagesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthCreateLanguagesCommandHandler>(AppHealthCreateLanguagesCommandHandler);
        service = module.get<AppHealthCreateLanguagesService>(AppHealthCreateLanguagesService);
    });

    describe('main', () =>
    {
        test('AppHealthCreateLanguagesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return AppHealthMockLanguageData createds', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthCreateLanguagesCommand(
                    appHealthMockLanguageData,
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
