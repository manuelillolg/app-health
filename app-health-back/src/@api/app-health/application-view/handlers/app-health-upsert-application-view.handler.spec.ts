/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpsertApplicationViewHandler } from '@api/app-health/application-view';
import { appHealthMockApplicationViewData } from '@app/app-health/application-view';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpsertApplicationViewHandler', () =>
{
    let handler: AppHealthUpsertApplicationViewHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpsertApplicationViewHandler,
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

        handler = module.get<AppHealthUpsertApplicationViewHandler>(AppHealthUpsertApplicationViewHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('AppHealthUpsertApplicationViewHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an applicationView upserted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationViewData[0])));
            expect(
                await handler.main(
                    appHealthMockApplicationViewData[0],
                    'Europe/Madrid',
                ))
                .toBe(appHealthMockApplicationViewData[0]);
        });
    });
});
