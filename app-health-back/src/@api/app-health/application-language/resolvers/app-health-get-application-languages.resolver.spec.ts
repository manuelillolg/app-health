/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthGetApplicationLanguagesHandler, AppHealthGetApplicationLanguagesResolver } from '@api/app-health/application-language';
import { appHealthMockApplicationLanguageData } from '@app/app-health/application-language';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthGetApplicationLanguagesResolver', () =>
{
    let resolver: AppHealthGetApplicationLanguagesResolver;
    let handler: AppHealthGetApplicationLanguagesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthGetApplicationLanguagesResolver,
                {
                    provide : AppHealthGetApplicationLanguagesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthGetApplicationLanguagesResolver>(AppHealthGetApplicationLanguagesResolver);
        handler = module.get<AppHealthGetApplicationLanguagesHandler>(AppHealthGetApplicationLanguagesHandler);
    });

    test('AppHealthGetApplicationLanguagesResolver should be defined', () =>
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthGetApplicationLanguagesResolver should be defined', () =>
        {
            expect(resolver).   toBeDefined();
        });

        test('should return a appHealthMockApplicationLanguageData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationLanguageData)));
            expect(await resolver.main()).toBe(appHealthMockApplicationLanguageData);
        });
    });
});
