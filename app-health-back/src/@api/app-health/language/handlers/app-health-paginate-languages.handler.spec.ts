/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthPaginateLanguagesHandler } from '@api/app-health/language';
import { appHealthMockLanguageData } from '@app/app-health/language';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthPaginateLanguagesHandler', () =>
{
    let handler: AppHealthPaginateLanguagesHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthPaginateLanguagesHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AppHealthPaginateLanguagesHandler>(AppHealthPaginateLanguagesHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthPaginateLanguagesHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthPaginateLanguagesHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a languages', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve({
                total: appHealthMockLanguageData.length,
                count: appHealthMockLanguageData.length,
                rows : appHealthMockLanguageData,
            })));
            expect(
                await handler.main(
                    {},
                    {},
                ),
            )
                .toEqual({
                    total: appHealthMockLanguageData.length,
                    count: appHealthMockLanguageData.length,
                    rows : appHealthMockLanguageData,
                });
        });
    });
});
