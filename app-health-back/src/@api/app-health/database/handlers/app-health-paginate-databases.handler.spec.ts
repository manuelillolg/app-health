/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthPaginateDatabasesHandler } from '@api/app-health/database';
import { appHealthMockDatabaseData } from '@app/app-health/database';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthPaginateDatabasesHandler', () =>
{
    let handler: AppHealthPaginateDatabasesHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthPaginateDatabasesHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AppHealthPaginateDatabasesHandler>(AppHealthPaginateDatabasesHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthPaginateDatabasesHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthPaginateDatabasesHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a databases', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve({
                total: appHealthMockDatabaseData.length,
                count: appHealthMockDatabaseData.length,
                rows : appHealthMockDatabaseData,
            })));
            expect(
                await handler.main(
                    {},
                    {},
                ),
            )
                .toEqual({
                    total: appHealthMockDatabaseData.length,
                    count: appHealthMockDatabaseData.length,
                    rows : appHealthMockDatabaseData,
                });
        });
    });
});
