/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthGetCustomersHandler } from '@api/app-health/customer';
import { appHealthMockCustomerData } from '@app/app-health/customer';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthGetCustomersHandler', () =>
{
    let handler: AppHealthGetCustomersHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthGetCustomersHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AppHealthGetCustomersHandler>(AppHealthGetCustomersHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthGetCustomersHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthGetCustomersHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a appHealthMockCustomerData', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockCustomerData)));
            expect(
                await handler.main(
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(appHealthMockCustomerData);
        });
    });
});
