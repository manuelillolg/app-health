/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpsertCustomerHandler } from '@api/app-health/customer';
import { appHealthMockCustomerData } from '@app/app-health/customer';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpsertCustomerHandler', () =>
{
    let handler: AppHealthUpsertCustomerHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpsertCustomerHandler,
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

        handler = module.get<AppHealthUpsertCustomerHandler>(AppHealthUpsertCustomerHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('AppHealthUpsertCustomerHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an customer upserted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockCustomerData[0])));
            expect(
                await handler.main(
                    appHealthMockCustomerData[0],
                    'Europe/Madrid',
                ))
                .toBe(appHealthMockCustomerData[0]);
        });
    });
});
