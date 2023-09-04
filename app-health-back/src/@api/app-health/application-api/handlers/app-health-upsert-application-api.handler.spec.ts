/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpsertApplicationApiHandler } from '@api/app-health/application-api';
import { appHealthMockApplicationApiData } from '@app/app-health/application-api';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpsertApplicationApiHandler', () =>
{
    let handler: AppHealthUpsertApplicationApiHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpsertApplicationApiHandler,
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

        handler = module.get<AppHealthUpsertApplicationApiHandler>(AppHealthUpsertApplicationApiHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('AppHealthUpsertApplicationApiHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an applicationApi upserted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationApiData[0])));
            expect(
                await handler.main(
                    appHealthMockApplicationApiData[0],
                    'Europe/Madrid',
                ))
                .toBe(appHealthMockApplicationApiData[0]);
        });
    });
});
