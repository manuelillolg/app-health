import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockLanguageData } from '@app/app-health/language/infrastructure/mock/app-health-mock-language.data';
import { AppHealthUpsertLanguageCommandHandler } from './app-health-upsert-language.command-handler';
import { AppHealthUpsertLanguageCommand } from './app-health-upsert-language.command';
import { AppHealthUpsertLanguageService } from './app-health-upsert-language.service';

describe('AppHealthUpsertLanguageCommandHandler', () =>
{
    let commandHandler: AppHealthUpsertLanguageCommandHandler;
    let service: AppHealthUpsertLanguageService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthUpsertLanguageCommandHandler,
                {
                    provide : AppHealthUpsertLanguageService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthUpsertLanguageCommandHandler>(AppHealthUpsertLanguageCommandHandler);
        service = module.get<AppHealthUpsertLanguageService>(AppHealthUpsertLanguageService);
    });

    describe('main', () =>
    {
        test('UpsertLanguageCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the AppHealthUpsertLanguageService', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthUpsertLanguageCommand(
                    {
                        id: appHealthMockLanguageData[0].id,
                        name: appHealthMockLanguageData[0].name,
                        versions: appHealthMockLanguageData[0].versions,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
