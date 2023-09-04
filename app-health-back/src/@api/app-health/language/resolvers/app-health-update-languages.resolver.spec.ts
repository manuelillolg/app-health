/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpdateLanguagesHandler, AppHealthUpdateLanguagesResolver } from '@api/app-health/language';
import { AppHealthUpdateLanguagesInput } from '@api/graphql';
import { appHealthMockLanguageData } from '@app/app-health/language';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateLanguagesResolver', () =>
{
    let resolver: AppHealthUpdateLanguagesResolver;
    let handler: AppHealthUpdateLanguagesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpdateLanguagesResolver,
                {
                    provide : AppHealthUpdateLanguagesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthUpdateLanguagesResolver>(AppHealthUpdateLanguagesResolver);
        handler = module.get<AppHealthUpdateLanguagesHandler>(AppHealthUpdateLanguagesHandler);
    });

    test('AppHealthUpdateLanguagesResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpdateLanguagesResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a languages updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockLanguageData[0])));
            expect(await resolver.main(<AppHealthUpdateLanguagesInput>appHealthMockLanguageData[0])).toBe(appHealthMockLanguageData[0]);
        });
    });
});
