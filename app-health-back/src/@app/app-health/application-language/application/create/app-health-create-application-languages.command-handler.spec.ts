/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockApplicationLanguageData } from '@app/app-health/application-language/infrastructure/mock/app-health-mock-application-language.data';
import { AppHealthCreateApplicationLanguagesCommandHandler } from './app-health-create-application-languages.command-handler';
import { AppHealthCreateApplicationLanguagesCommand } from './app-health-create-application-languages.command';
import { AppHealthCreateApplicationLanguagesService } from './app-health-create-application-languages.service';

describe('appHealthCreateApplicationLanguagesCommandHandler', () =>
{
    let commandHandler: AppHealthCreateApplicationLanguagesCommandHandler;
    let service: AppHealthCreateApplicationLanguagesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateApplicationLanguagesCommandHandler,
                {
                    provide : AppHealthCreateApplicationLanguagesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthCreateApplicationLanguagesCommandHandler>(AppHealthCreateApplicationLanguagesCommandHandler);
        service = module.get<AppHealthCreateApplicationLanguagesService>(AppHealthCreateApplicationLanguagesService);
    });

    describe('main', () =>
    {
        test('AppHealthCreateApplicationLanguagesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return AppHealthMockApplicationLanguageData createds', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthCreateApplicationLanguagesCommand(
                    appHealthMockApplicationLanguageData,
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
