/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthDeleteCustomerByIdHandler } from '@api/app-health/customer';
import { appHealthMockCustomerData } from '@app/app-health/customer';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteCustomerByIdController', () =>
{
    let handler: AppHealthDeleteCustomerByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthDeleteCustomerByIdHandler,
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

        handler = module.get<AppHealthDeleteCustomerByIdHandler>(AppHealthDeleteCustomerByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteCustomerByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an customer deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockCustomerData[0])));
            expect(
                await handler.main(
                    appHealthMockCustomerData[0].id,
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(appHealthMockCustomerData[0]);
        });
    });
});
