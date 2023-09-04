/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthCreateLanguageHandler, AppHealthCreateLanguageResolver } from '@api/app-health/language';
import { AppHealthCreateLanguageInput } from '@api/graphql';
import { appHealthMockLanguageData } from '@app/app-health/language';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateLanguageResolver', () =>
{
    let resolver: AppHealthCreateLanguageResolver;
    let handler: AppHealthCreateLanguageHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthCreateLanguageResolver,
                {
                    provide : AppHealthCreateLanguageHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthCreateLanguageResolver>(AppHealthCreateLanguageResolver);
        handler = module.get<AppHealthCreateLanguageHandler>(AppHealthCreateLanguageHandler);
    });

    test('AppHealthCreateLanguageResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthCreateLanguageResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an language created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockLanguageData[0])));
            expect(await resolver.main(<AppHealthCreateLanguageInput>appHealthMockLanguageData[0])).toBe(appHealthMockLanguageData[0]);
        });
    });
});
