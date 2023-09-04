import { AppHealthCreateLanguageCommandHandler } from './app-health-create-language.command-handler';
import { AppHealthCreateLanguageService } from './app-health-create-language.service';
import { AppHealthCreateLanguageCommand, appHealthMockLanguageData } from '@app/app-health/language';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateLanguageCommandHandler', () =>
{
    let commandHandler: AppHealthCreateLanguageCommandHandler;
    let service: AppHealthCreateLanguageService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateLanguageCommandHandler,
                {
                    provide : AppHealthCreateLanguageService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthCreateLanguageCommandHandler>(AppHealthCreateLanguageCommandHandler);
        service = module.get<AppHealthCreateLanguageService>(AppHealthCreateLanguageService);
    });

    describe('main', () =>
    {
        test('CreateLanguageCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the AppHealthCreateLanguageService', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthCreateLanguageCommand(
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
