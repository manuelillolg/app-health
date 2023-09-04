import { AppHealthCreateLanguagesHandler, AppHealthCreateLanguagesResolver } from '@api/app-health/language';
import { AppHealthCreateLanguageInput } from '@api/graphql';
import { appHealthMockLanguageData } from '@app/app-health/language';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateLanguagesResolver', () =>
{
    let resolver: AppHealthCreateLanguagesResolver;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateLanguagesResolver,
                {
                    provide : AppHealthCreateLanguagesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthCreateLanguagesResolver>(AppHealthCreateLanguagesResolver);
    });

    test('AppHealthCreateLanguagesResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthCreateLanguagesResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an languages created', async () =>
        {
            expect(await resolver.main(<AppHealthCreateLanguageInput[]>appHealthMockLanguageData)).toBe(undefined);
        });
    });
});
