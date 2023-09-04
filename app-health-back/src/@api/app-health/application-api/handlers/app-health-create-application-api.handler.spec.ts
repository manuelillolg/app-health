/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthCreateApplicationApiHandler } from '@api/app-health/application-api';
import { appHealthMockApplicationApiData } from '@app/app-health/application-api';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateApplicationApiHandler', () =>
{
    let handler: AppHealthCreateApplicationApiHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthCreateApplicationApiHandler,
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

        handler = module.get<AppHealthCreateApplicationApiHandler>(AppHealthCreateApplicationApiHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('AppHealthCreateApplicationApiHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an applicationApi created', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationApiData[0])));
            expect(
                await handler.main(
                    appHealthMockApplicationApiData[0],
                    'Europe/Madrid',
                ),
            )
                .toBe(appHealthMockApplicationApiData[0]);
        });
    });
});
