/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthGetApplicationViewsHandler } from '@api/app-health/application-view';
import { appHealthMockApplicationViewData } from '@app/app-health/application-view';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthGetApplicationViewsHandler', () =>
{
    let handler: AppHealthGetApplicationViewsHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthGetApplicationViewsHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AppHealthGetApplicationViewsHandler>(AppHealthGetApplicationViewsHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthGetApplicationViewsHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthGetApplicationViewsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a appHealthMockApplicationViewData', async () =>
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
