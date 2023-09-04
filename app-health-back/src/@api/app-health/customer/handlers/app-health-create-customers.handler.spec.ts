import { AppHealthCreateCustomersHandler } from '@api/app-health/customer';
import { appHealthMockCustomerData } from '@app/app-health/customer';
import { ICommandBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateCustomersHandler', () =>
{
    let handler: AppHealthCreateCustomersHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateCustomersHandler,
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AppHealthCreateCustomersHandler>(AppHealthCreateCustomersHandler);
    });

    describe('main', () =>
    {
        test('AppHealthCreateCustomersHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an appHealthMockCustomerData created', async () =>
        {
            expect(await handler.main(appHealthMockCustomerData)).toBe(true);
        });
    });
});
