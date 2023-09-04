/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpdateCustomerByIdHandler } from '@api/app-health/customer';
import { AppHealthUpdateCustomerByIdInput } from '@api/graphql';
import { appHealthMockCustomerData } from '@app/app-health/customer';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateCustomerByIdHandler', () =>
{
    let handler: AppHealthUpdateCustomerByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpdateCustomerByIdHandler,
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

        handler = module.get<AppHealthUpdateCustomerByIdHandler>(AppHealthUpdateCustomerByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthUpdateCustomerByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpdateCustomerByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a customer updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockCustomerData[0])));
            expect(
                await handler.main(
                    <AppHealthUpdateCustomerByIdInput>appHealthMockCustomerData[0],
                    {},
                    'Europe/Madrid',
                ))
                .toBe(appHealthMockCustomerData[0]);
        });
    });
});
