/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthPaginateLanguagesHandler, AppHealthPaginateLanguagesResolver } from '@api/app-health/language';
import { appHealthMockLanguageData } from '@app/app-health/language';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthPaginateLanguagesResolver', () =>
{
    let resolver: AppHealthPaginateLanguagesResolver;
    let handler: AppHealthPaginateLanguagesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthPaginateLanguagesResolver,
                {
                    provide : AppHealthPaginateLanguagesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthPaginateLanguagesResolver>(AppHealthPaginateLanguagesResolver);
        handler = module.get<AppHealthPaginateLanguagesHandler>(AppHealthPaginateLanguagesHandler);
    });

    test('AppHealthPaginateLanguagesResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthPaginateLanguagesResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a appHealthMockLanguageData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : appHealthMockLanguageData,
            })));
            expect(await resolver.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : appHealthMockLanguageData,
            });
        });
    });
});
