import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockLanguageData } from '@app/app-health/language/infrastructure/mock/app-health-mock-language.data';
import { AppHealthUpdateLanguageByIdCommandHandler } from './app-health-update-language-by-id.command-handler';
import { AppHealthUpdateLanguageByIdCommand } from './app-health-update-language-by-id.command';
import { AppHealthUpdateLanguageByIdService } from './app-health-update-language-by-id.service';

describe('AppHealthUpdateLanguageByIdCommandHandler', () =>
{
    let commandHandler: AppHealthUpdateLanguageByIdCommandHandler;
    let service: AppHealthUpdateLanguageByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthUpdateLanguageByIdCommandHandler,
                {
                    provide : AppHealthUpdateLanguageByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthUpdateLanguageByIdCommandHandler>(AppHealthUpdateLanguageByIdCommandHandler);
        service = module.get<AppHealthUpdateLanguageByIdService>(AppHealthUpdateLanguageByIdService);
    });

    describe('main', () =>
    {
        test('UpdateLanguageByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an language created', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthUpdateLanguageByIdCommand(
                    {
                        id: appHealthMockLanguageData[0].id,
                        name: appHealthMockLanguageData[0].name,
                        versions: appHealthMockLanguageData[0].versions,
                    },
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
