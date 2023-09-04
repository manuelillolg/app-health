/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpdateCustomersHandler } from '@api/app-health/customer';
import { AppHealthUpdateCustomersInput } from '@api/graphql';
import { appHealthMockCustomerData } from '@app/app-health/customer';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateCustomersHandler', () =>
{
    let handler: AppHealthUpdateCustomersHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpdateCustomersHandler,
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

        handler = module.get<AppHealthUpdateCustomersHandler>(AppHealthUpdateCustomersHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthUpdateCustomersHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpdateCustomersHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a customers updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockCustomerData[0])));
            expect(
                await handler.main(
                    <AppHealthUpdateCustomersInput>appHealthMockCustomerData[0],
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(appHealthMockCustomerData[0]);
        });
    });
});
