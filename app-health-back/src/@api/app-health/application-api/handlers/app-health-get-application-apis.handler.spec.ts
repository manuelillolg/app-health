/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthGetApplicationApisHandler } from '@api/app-health/application-api';
import { appHealthMockApplicationApiData } from '@app/app-health/application-api';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthGetApplicationApisHandler', () =>
{
    let handler: AppHealthGetApplicationApisHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthGetApplicationApisHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AppHealthGetApplicationApisHandler>(AppHealthGetApplicationApisHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthGetApplicationApisHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthGetApplicationApisHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a appHealthMockApplicationApiData', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationApiData)));
            expect(
                await handler.main(
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(appHealthMockApplicationApiData);
        });
    });
});
