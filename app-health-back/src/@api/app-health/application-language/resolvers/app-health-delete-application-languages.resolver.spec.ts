/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthDeleteApplicationLanguagesHandler, AppHealthDeleteApplicationLanguagesResolver } from '@api/app-health/application-language';
import { appHealthMockApplicationLanguageData } from '@app/app-health/application-language';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteApplicationLanguagesResolver', () =>
{
    let resolver: AppHealthDeleteApplicationLanguagesResolver;
    let handler: AppHealthDeleteApplicationLanguagesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthDeleteApplicationLanguagesResolver,
                {
                    provide : AppHealthDeleteApplicationLanguagesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthDeleteApplicationLanguagesResolver>(AppHealthDeleteApplicationLanguagesResolver);
        handler = module.get<AppHealthDeleteApplicationLanguagesHandler>(AppHealthDeleteApplicationLanguagesHandler);
    });

    test('AppHealthDeleteApplicationLanguagesResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthDeleteApplicationLanguagesResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an appHealthMockApplicationLanguageData deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationLanguageData)));
            expect(await resolver.main()).toBe(appHealthMockApplicationLanguageData);
        });
    });
});
