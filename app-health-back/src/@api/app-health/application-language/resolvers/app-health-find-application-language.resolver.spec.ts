/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthFindApplicationLanguageHandler, AppHealthFindApplicationLanguageResolver } from '@api/app-health/application-language';
import { appHealthMockApplicationLanguageData } from '@app/app-health/application-language';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindApplicationLanguageResolver', () =>
{
    let resolver: AppHealthFindApplicationLanguageResolver;
    let handler: AppHealthFindApplicationLanguageHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthFindApplicationLanguageResolver,
                {
                    provide : AppHealthFindApplicationLanguageHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthFindApplicationLanguageResolver>(AppHealthFindApplicationLanguageResolver);
        handler = module.get<AppHealthFindApplicationLanguageHandler>(AppHealthFindApplicationLanguageHandler);
    });

    test('AppHealthFindApplicationLanguageResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthFindApplicationLanguageResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a applicationLanguage', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationLanguageData[0])));
            expect(await resolver.main()).toBe(appHealthMockApplicationLanguageData[0]);
        });
    });
});
