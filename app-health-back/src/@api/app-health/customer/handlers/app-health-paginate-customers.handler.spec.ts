/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthPaginateCustomersHandler } from '@api/app-health/customer';
import { appHealthMockCustomerData } from '@app/app-health/customer';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthPaginateCustomersHandler', () =>
{
    let handler: AppHealthPaginateCustomersHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthPaginateCustomersHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AppHealthPaginateCustomersHandler>(AppHealthPaginateCustomersHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthPaginateCustomersHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthPaginateCustomersHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a customers', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve({
                total: appHealthMockCustomerData.length,
                count: appHealthMockCustomerData.length,
                rows : appHealthMockCustomerData,
            })));
            expect(
                await handler.main(
                    {},
                    {},
                ),
            )
                .toEqual({
                    total: appHealthMockCustomerData.length,
                    count: appHealthMockCustomerData.length,
                    rows : appHealthMockCustomerData,
                });
        });
    });
});
