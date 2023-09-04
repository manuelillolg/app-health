/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthCreateApplicationLanguageHandler, AppHealthCreateApplicationLanguageResolver } from '@api/app-health/application-language';
import { AppHealthCreateApplicationLanguageInput } from '@api/graphql';
import { appHealthMockApplicationLanguageData } from '@app/app-health/application-language';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateApplicationLanguageResolver', () =>
{
    let resolver: AppHealthCreateApplicationLanguageResolver;
    let handler: AppHealthCreateApplicationLanguageHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthCreateApplicationLanguageResolver,
                {
                    provide : AppHealthCreateApplicationLanguageHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthCreateApplicationLanguageResolver>(AppHealthCreateApplicationLanguageResolver);
        handler = module.get<AppHealthCreateApplicationLanguageHandler>(AppHealthCreateApplicationLanguageHandler);
    });

    test('AppHealthCreateApplicationLanguageResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthCreateApplicationLanguageResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an applicationLanguage created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationLanguageData[0])));
            expect(await resolver.main(<AppHealthCreateApplicationLanguageInput>appHealthMockApplicationLanguageData[0])).toBe(appHealthMockApplicationLanguageData[0]);
        });
    });
});
