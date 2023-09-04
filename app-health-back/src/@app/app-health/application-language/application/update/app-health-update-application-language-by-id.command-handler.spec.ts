import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockApplicationLanguageData } from '@app/app-health/application-language/infrastructure/mock/app-health-mock-application-language.data';
import { AppHealthUpdateApplicationLanguageByIdCommandHandler } from './app-health-update-application-language-by-id.command-handler';
import { AppHealthUpdateApplicationLanguageByIdCommand } from './app-health-update-application-language-by-id.command';
import { AppHealthUpdateApplicationLanguageByIdService } from './app-health-update-application-language-by-id.service';

describe('AppHealthUpdateApplicationLanguageByIdCommandHandler', () =>
{
    let commandHandler: AppHealthUpdateApplicationLanguageByIdCommandHandler;
    let service: AppHealthUpdateApplicationLanguageByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthUpdateApplicationLanguageByIdCommandHandler,
                {
                    provide : AppHealthUpdateApplicationLanguageByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthUpdateApplicationLanguageByIdCommandHandler>(AppHealthUpdateApplicationLanguageByIdCommandHandler);
        service = module.get<AppHealthUpdateApplicationLanguageByIdService>(AppHealthUpdateApplicationLanguageByIdService);
    });

    describe('main', () =>
    {
        test('UpdateApplicationLanguageByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an applicationLanguage created', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthUpdateApplicationLanguageByIdCommand(
                    {
                        id: appHealthMockApplicationLanguageData[0].id,
                        applicationId: appHealthMockApplicationLanguageData[0].applicationId,
                        languageId: appHealthMockApplicationLanguageData[0].languageId,
                        version: appHealthMockApplicationLanguageData[0].version,
                        score: appHealthMockApplicationLanguageData[0].score,
                        codeQualityScore: appHealthMockApplicationLanguageData[0].codeQualityScore,
                    },
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
