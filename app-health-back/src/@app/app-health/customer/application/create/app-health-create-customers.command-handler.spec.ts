/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockCustomerData } from '@app/app-health/customer/infrastructure/mock/app-health-mock-customer.data';
import { AppHealthCreateCustomersCommandHandler } from './app-health-create-customers.command-handler';
import { AppHealthCreateCustomersCommand } from './app-health-create-customers.command';
import { AppHealthCreateCustomersService } from './app-health-create-customers.service';

describe('appHealthCreateCustomersCommandHandler', () =>
{
    let commandHandler: AppHealthCreateCustomersCommandHandler;
    let service: AppHealthCreateCustomersService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateCustomersCommandHandler,
                {
                    provide : AppHealthCreateCustomersService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthCreateCustomersCommandHandler>(AppHealthCreateCustomersCommandHandler);
        service = module.get<AppHealthCreateCustomersService>(AppHealthCreateCustomersService);
    });

    describe('main', () =>
    {
        test('AppHealthCreateCustomersCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return AppHealthMockCustomerData createds', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthCreateCustomersCommand(
                    appHealthMockCustomerData,
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
