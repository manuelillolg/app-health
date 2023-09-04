/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpsertApplicationLanguageHandler, AppHealthUpsertApplicationLanguageResolver } from '@api/app-health/application-language';
import { AppHealthUpdateApplicationLanguageByIdInput } from '@api/graphql';
import { appHealthMockApplicationLanguageData } from '@app/app-health/application-language';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpsertApplicationLanguageResolver', () =>
{
    let resolver: AppHealthUpsertApplicationLanguageResolver;
    let handler: AppHealthUpsertApplicationLanguageHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpsertApplicationLanguageResolver,
                {
                    provide : AppHealthUpsertApplicationLanguageHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthUpsertApplicationLanguageResolver>(AppHealthUpsertApplicationLanguageResolver);
        handler = module.get<AppHealthUpsertApplicationLanguageHandler>(AppHealthUpsertApplicationLanguageHandler);
    });

    test('AppHealthUpsertApplicationLanguageResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpsertApplicationLanguageResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an applicationLanguage upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationLanguageData[0])));
            expect(await resolver.main(<AppHealthUpdateApplicationLanguageByIdInput>appHealthMockApplicationLanguageData[0])).toBe(appHealthMockApplicationLanguageData[0]);
        });
    });
});
