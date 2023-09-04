/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthFindCustomerHandler } from '@api/app-health/customer';
import { appHealthMockCustomerData } from '@app/app-health/customer';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindCustomerHandler', () =>
{
    let handler: AppHealthFindCustomerHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthFindCustomerHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AppHealthFindCustomerHandler>(AppHealthFindCustomerHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthFindCustomerHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthFindCustomerHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a customer', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockCustomerData[0])));
            expect(
                await handler.main(
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(appHealthMockCustomerData[0]);
        });
    });
});
