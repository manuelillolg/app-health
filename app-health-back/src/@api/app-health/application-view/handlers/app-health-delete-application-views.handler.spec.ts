/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthDeleteApplicationViewsHandler } from '@api/app-health/application-view';
import { appHealthMockApplicationViewData } from '@app/app-health/application-view';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteApplicationViewsHandler', () =>
{
    let handler: AppHealthDeleteApplicationViewsHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthDeleteApplicationViewsHandler,
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

        handler = module.get<AppHealthDeleteApplicationViewsHandler>(AppHealthDeleteApplicationViewsHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthDeleteApplicationViewsHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthDeleteApplicationViewsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an appHealthMockApplicationViewData deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationViewData)));
            expect(
                await handler.main(
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(appHealthMockApplicationViewData);
        });
    });
});
