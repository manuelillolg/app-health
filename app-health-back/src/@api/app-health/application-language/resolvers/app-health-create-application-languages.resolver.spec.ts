import { AppHealthCreateApplicationLanguagesHandler, AppHealthCreateApplicationLanguagesResolver } from '@api/app-health/application-language';
import { AppHealthCreateApplicationLanguageInput } from '@api/graphql';
import { appHealthMockApplicationLanguageData } from '@app/app-health/application-language';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateApplicationLanguagesResolver', () =>
{
    let resolver: AppHealthCreateApplicationLanguagesResolver;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateApplicationLanguagesResolver,
                {
                    provide : AppHealthCreateApplicationLanguagesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthCreateApplicationLanguagesResolver>(AppHealthCreateApplicationLanguagesResolver);
    });

    test('AppHealthCreateApplicationLanguagesResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthCreateApplicationLanguagesResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an applicationLanguages created', async () =>
        {
            expect(await resolver.main(<AppHealthCreateApplicationLanguageInput[]>appHealthMockApplicationLanguageData)).toBe(undefined);
        });
    });
});
