import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockApplicationLanguageData } from '@app/app-health/application-language/infrastructure/mock/app-health-mock-application-language.data';
import { AppHealthUpdateApplicationLanguagesCommandHandler } from './app-health-update-application-languages.command-handler';
import { AppHealthUpdateApplicationLanguagesCommand } from './app-health-update-application-languages.command';
import { AppHealthUpdateApplicationLanguagesService } from './app-health-update-application-languages.service';

describe('AppHealthUpdateApplicationLanguagesCommandHandler', () =>
{
    let commandHandler: AppHealthUpdateApplicationLanguagesCommandHandler;
    let service: AppHealthUpdateApplicationLanguagesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthUpdateApplicationLanguagesCommandHandler,
                {
                    provide : AppHealthUpdateApplicationLanguagesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthUpdateApplicationLanguagesCommandHandler>(AppHealthUpdateApplicationLanguagesCommandHandler);
        service = module.get<AppHealthUpdateApplicationLanguagesService>(AppHealthUpdateApplicationLanguagesService);
    });

    describe('main', () =>
    {
        test('UpdateApplicationLanguagesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an applicationLanguages updated', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthUpdateApplicationLanguagesCommand(
                    {
                        id: appHealthMockApplicationLanguageData[0].id,
                        applicationId: appHealthMockApplicationLanguageData[0].applicationId,
                        languageId: appHealthMockApplicationLanguageData[0].languageId,
                        version: appHealthMockApplicationLanguageData[0].version,
                        score: appHealthMockApplicationLanguageData[0].score,
                        codeQualityScore: appHealthMockApplicationLanguageData[0].codeQualityScore,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
