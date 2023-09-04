/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthPaginateApplicationDatabasesHandler } from '@api/app-health/application-database';
import { appHealthMockApplicationDatabaseData } from '@app/app-health/application-database';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthPaginateApplicationDatabasesHandler', () =>
{
    let handler: AppHealthPaginateApplicationDatabasesHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthPaginateApplicationDatabasesHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AppHealthPaginateApplicationDatabasesHandler>(AppHealthPaginateApplicationDatabasesHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthPaginateApplicationDatabasesHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthPaginateApplicationDatabasesHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a applicationDatabases', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve({
                total: appHealthMockApplicationDatabaseData.length,
                count: appHealthMockApplicationDatabaseData.length,
                rows : appHealthMockApplicationDatabaseData,
            })));
            expect(
                await handler.main(
                    {},
                    {},
                ),
            )
                .toEqual({
                    total: appHealthMockApplicationDatabaseData.length,
                    count: appHealthMockApplicationDatabaseData.length,
                    rows : appHealthMockApplicationDatabaseData,
                });
        });
    });
});
