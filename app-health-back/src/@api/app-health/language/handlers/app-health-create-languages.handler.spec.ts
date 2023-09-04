import { AppHealthCreateLanguagesHandler } from '@api/app-health/language';
import { appHealthMockLanguageData } from '@app/app-health/language';
import { ICommandBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateLanguagesHandler', () =>
{
    let handler: AppHealthCreateLanguagesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateLanguagesHandler,
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AppHealthCreateLanguagesHandler>(AppHealthCreateLanguagesHandler);
    });

    describe('main', () =>
    {
        test('AppHealthCreateLanguagesHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an appHealthMockLanguageData created', async () =>
        {
            expect(await handler.main(appHealthMockLanguageData)).toBe(true);
        });
    });
});
