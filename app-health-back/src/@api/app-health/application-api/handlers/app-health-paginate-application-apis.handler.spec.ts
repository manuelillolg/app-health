/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthPaginateApplicationApisHandler } from '@api/app-health/application-api';
import { appHealthMockApplicationApiData } from '@app/app-health/application-api';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthPaginateApplicationApisHandler', () =>
{
    let handler: AppHealthPaginateApplicationApisHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthPaginateApplicationApisHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AppHealthPaginateApplicationApisHandler>(AppHealthPaginateApplicationApisHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthPaginateApplicationApisHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthPaginateApplicationApisHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a applicationApis', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve({
                total: appHealthMockApplicationApiData.length,
                count: appHealthMockApplicationApiData.length,
                rows : appHealthMockApplicationApiData,
            })));
            expect(
                await handler.main(
                    {},
                    {},
                ),
            )
                .toEqual({
                    total: appHealthMockApplicationApiData.length,
                    count: appHealthMockApplicationApiData.length,
                    rows : appHealthMockApplicationApiData,
                });
        });
    });
});
