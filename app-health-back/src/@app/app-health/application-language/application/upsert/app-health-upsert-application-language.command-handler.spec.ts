import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockApplicationLanguageData } from '@app/app-health/application-language/infrastructure/mock/app-health-mock-application-language.data';
import { AppHealthUpsertApplicationLanguageCommandHandler } from './app-health-upsert-application-language.command-handler';
import { AppHealthUpsertApplicationLanguageCommand } from './app-health-upsert-application-language.command';
import { AppHealthUpsertApplicationLanguageService } from './app-health-upsert-application-language.service';

describe('AppHealthUpsertApplicationLanguageCommandHandler', () =>
{
    let commandHandler: AppHealthUpsertApplicationLanguageCommandHandler;
    let service: AppHealthUpsertApplicationLanguageService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthUpsertApplicationLanguageCommandHandler,
                {
                    provide : AppHealthUpsertApplicationLanguageService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthUpsertApplicationLanguageCommandHandler>(AppHealthUpsertApplicationLanguageCommandHandler);
        service = module.get<AppHealthUpsertApplicationLanguageService>(AppHealthUpsertApplicationLanguageService);
    });

    describe('main', () =>
    {
        test('UpsertApplicationLanguageCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the AppHealthUpsertApplicationLanguageService', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthUpsertApplicationLanguageCommand(
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
