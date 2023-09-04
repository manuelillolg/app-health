/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthFindCustomerByIdHandler } from '@api/app-health/customer';
import { appHealthMockCustomerData } from '@app/app-health/customer';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindCustomerByIdHandler', () =>
{
    let handler: AppHealthFindCustomerByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthFindCustomerByIdHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AppHealthFindCustomerByIdHandler>(AppHealthFindCustomerByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthFindCustomerByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthFindCustomerByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an customer by id', async () =>
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
