/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpsertDatabaseHandler } from '@api/app-health/database';
import { appHealthMockDatabaseData } from '@app/app-health/database';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpsertDatabaseHandler', () =>
{
    let handler: AppHealthUpsertDatabaseHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpsertDatabaseHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AppHealthUpsertDatabaseHandler>(AppHealthUpsertDatabaseHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('AppHealthUpsertDatabaseHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an database upserted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockDatabaseData[0])));
            expect(
                await handler.main(
                    appHealthMockDatabaseData[0],
                    'Europe/Madrid',
                ))
                .toBe(appHealthMockDatabaseData[0]);
        });
    });
});
