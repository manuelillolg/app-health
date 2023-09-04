/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthPaginateApplicationLanguagesHandler } from '@api/app-health/application-language';
import { appHealthMockApplicationLanguageData } from '@app/app-health/application-language';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthPaginateApplicationLanguagesHandler', () =>
{
    let handler: AppHealthPaginateApplicationLanguagesHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthPaginateApplicationLanguagesHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AppHealthPaginateApplicationLanguagesHandler>(AppHealthPaginateApplicationLanguagesHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthPaginateApplicationLanguagesHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthPaginateApplicationLanguagesHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a applicationLanguages', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve({
                total: appHealthMockApplicationLanguageData.length,
                count: appHealthMockApplicationLanguageData.length,
                rows : appHealthMockApplicationLanguageData,
            })));
            expect(
                await handler.main(
                    {},
                    {},
                ),
            )
                .toEqual({
                    total: appHealthMockApplicationLanguageData.length,
                    count: appHealthMockApplicationLanguageData.length,
                    rows : appHealthMockApplicationLanguageData,
                });
        });
    });
});
