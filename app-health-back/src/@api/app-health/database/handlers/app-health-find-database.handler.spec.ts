/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthFindDatabaseHandler } from '@api/app-health/database';
import { appHealthMockDatabaseData } from '@app/app-health/database';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindDatabaseHandler', () =>
{
    let handler: AppHealthFindDatabaseHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthFindDatabaseHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AppHealthFindDatabaseHandler>(AppHealthFindDatabaseHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthFindDatabaseHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthFindDatabaseHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a database', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockDatabaseData[0])));
            expect(
                await handler.main(
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(appHealthMockDatabaseData[0]);
        });
    });
});
