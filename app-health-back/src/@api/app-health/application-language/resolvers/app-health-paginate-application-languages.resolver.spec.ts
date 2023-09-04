/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthPaginateApplicationLanguagesHandler, AppHealthPaginateApplicationLanguagesResolver } from '@api/app-health/application-language';
import { appHealthMockApplicationLanguageData } from '@app/app-health/application-language';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthPaginateApplicationLanguagesResolver', () =>
{
    let resolver: AppHealthPaginateApplicationLanguagesResolver;
    let handler: AppHealthPaginateApplicationLanguagesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthPaginateApplicationLanguagesResolver,
                {
                    provide : AppHealthPaginateApplicationLanguagesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthPaginateApplicationLanguagesResolver>(AppHealthPaginateApplicationLanguagesResolver);
        handler = module.get<AppHealthPaginateApplicationLanguagesHandler>(AppHealthPaginateApplicationLanguagesHandler);
    });

    test('AppHealthPaginateApplicationLanguagesResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthPaginateApplicationLanguagesResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a appHealthMockApplicationLanguageData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : appHealthMockApplicationLanguageData,
            })));
            expect(await resolver.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : appHealthMockApplicationLanguageData,
            });
        });
    });
});
