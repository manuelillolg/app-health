import { AppHealthCreateApplicationLanguagesHandler } from '@api/app-health/application-language';
import { appHealthMockApplicationLanguageData } from '@app/app-health/application-language';
import { ICommandBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateApplicationLanguagesHandler', () =>
{
    let handler: AppHealthCreateApplicationLanguagesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateApplicationLanguagesHandler,
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AppHealthCreateApplicationLanguagesHandler>(AppHealthCreateApplicationLanguagesHandler);
    });

    describe('main', () =>
    {
        test('AppHealthCreateApplicationLanguagesHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an appHealthMockApplicationLanguageData created', async () =>
        {
            expect(await handler.main(appHealthMockApplicationLanguageData)).toBe(true);
        });
    });
});
