/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthPaginateApplicationViewsHandler } from '@api/app-health/application-view';
import { appHealthMockApplicationViewData } from '@app/app-health/application-view';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthPaginateApplicationViewsHandler', () =>
{
    let handler: AppHealthPaginateApplicationViewsHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthPaginateApplicationViewsHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AppHealthPaginateApplicationViewsHandler>(AppHealthPaginateApplicationViewsHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthPaginateApplicationViewsHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthPaginateApplicationViewsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a applicationViews', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve({
                total: appHealthMockApplicationViewData.length,
                count: appHealthMockApplicationViewData.length,
                rows : appHealthMockApplicationViewData,
            })));
            expect(
                await handler.main(
                    {},
                    {},
                ),
            )
                .toEqual({
                    total: appHealthMockApplicationViewData.length,
                    count: appHealthMockApplicationViewData.length,
                    rows : appHealthMockApplicationViewData,
                });
        });
    });
});
