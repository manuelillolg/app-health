/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthCreateCustomerHandler } from '@api/app-health/customer';
import { appHealthMockCustomerData } from '@app/app-health/customer';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateCustomerHandler', () =>
{
    let handler: AppHealthCreateCustomerHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthCreateCustomerHandler,
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

        handler = module.get<AppHealthCreateCustomerHandler>(AppHealthCreateCustomerHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('AppHealthCreateCustomerHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an customer created', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockCustomerData[0])));
            expect(
                await handler.main(
                    appHealthMockCustomerData[0],
                    'Europe/Madrid',
                ),
            )
                .toBe(appHealthMockCustomerData[0]);
        });
    });
});
