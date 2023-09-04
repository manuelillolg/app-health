/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpsertApplicationDatabaseHandler } from '@api/app-health/application-database';
import { appHealthMockApplicationDatabaseData } from '@app/app-health/application-database';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpsertApplicationDatabaseHandler', () =>
{
    let handler: AppHealthUpsertApplicationDatabaseHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpsertApplicationDatabaseHandler,
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

        handler = module.get<AppHealthUpsertApplicationDatabaseHandler>(AppHealthUpsertApplicationDatabaseHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('AppHealthUpsertApplicationDatabaseHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an applicationDatabase upserted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationDatabaseData[0])));
            expect(
                await handler.main(
                    appHealthMockApplicationDatabaseData[0],
                    'Europe/Madrid',
                ))
                .toBe(appHealthMockApplicationDatabaseData[0]);
        });
    });
});
