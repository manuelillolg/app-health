/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpsertLanguageHandler, AppHealthUpsertLanguageResolver } from '@api/app-health/language';
import { AppHealthUpdateLanguageByIdInput } from '@api/graphql';
import { appHealthMockLanguageData } from '@app/app-health/language';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpsertLanguageResolver', () =>
{
    let resolver: AppHealthUpsertLanguageResolver;
    let handler: AppHealthUpsertLanguageHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpsertLanguageResolver,
                {
                    provide : AppHealthUpsertLanguageHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthUpsertLanguageResolver>(AppHealthUpsertLanguageResolver);
        handler = module.get<AppHealthUpsertLanguageHandler>(AppHealthUpsertLanguageHandler);
    });

    test('AppHealthUpsertLanguageResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpsertLanguageResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an language upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockLanguageData[0])));
            expect(await resolver.main(<AppHealthUpdateLanguageByIdInput>appHealthMockLanguageData[0])).toBe(appHealthMockLanguageData[0]);
        });
    });
});
