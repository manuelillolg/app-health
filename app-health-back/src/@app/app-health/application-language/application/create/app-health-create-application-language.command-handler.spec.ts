import { AppHealthCreateApplicationLanguageCommandHandler } from './app-health-create-application-language.command-handler';
import { AppHealthCreateApplicationLanguageService } from './app-health-create-application-language.service';
import { AppHealthCreateApplicationLanguageCommand, appHealthMockApplicationLanguageData } from '@app/app-health/application-language';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateApplicationLanguageCommandHandler', () =>
{
    let commandHandler: AppHealthCreateApplicationLanguageCommandHandler;
    let service: AppHealthCreateApplicationLanguageService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateApplicationLanguageCommandHandler,
                {
                    provide : AppHealthCreateApplicationLanguageService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthCreateApplicationLanguageCommandHandler>(AppHealthCreateApplicationLanguageCommandHandler);
        service = module.get<AppHealthCreateApplicationLanguageService>(AppHealthCreateApplicationLanguageService);
    });

    describe('main', () =>
    {
        test('CreateApplicationLanguageCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the AppHealthCreateApplicationLanguageService', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthCreateApplicationLanguageCommand(
                    {
                        id: appHealthMockApplicationLanguageData[0].id,
                        applicationId: appHealthMockApplicationLanguageData[0].applicationId,
                        languageId: appHealthMockApplicationLanguageData[0].languageId,
                        version: appHealthMockApplicationLanguageData[0].version,
                        score: appHealthMockApplicationLanguageData[0].score,
                        codeQualityScore: appHealthMockApplicationLanguageData[0].codeQualityScore,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
