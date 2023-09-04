/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpdateApplicationViewsHandler } from '@api/app-health/application-view';
import { AppHealthUpdateApplicationViewsInput } from '@api/graphql';
import { appHealthMockApplicationViewData } from '@app/app-health/application-view';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateApplicationViewsHandler', () =>
{
    let handler: AppHealthUpdateApplicationViewsHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpdateApplicationViewsHandler,
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

        handler = module.get<AppHealthUpdateApplicationViewsHandler>(AppHealthUpdateApplicationViewsHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthUpdateApplicationViewsHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpdateApplicationViewsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a applicationViews updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationViewData[0])));
            expect(
                await handler.main(
                    <AppHealthUpdateApplicationViewsInput>appHealthMockApplicationViewData[0],
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(appHealthMockApplicationViewData[0]);
        });
    });
});
