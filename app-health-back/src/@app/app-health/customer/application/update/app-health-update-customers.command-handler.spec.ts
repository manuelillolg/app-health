import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockCustomerData } from '@app/app-health/customer/infrastructure/mock/app-health-mock-customer.data';
import { AppHealthUpdateCustomersCommandHandler } from './app-health-update-customers.command-handler';
import { AppHealthUpdateCustomersCommand } from './app-health-update-customers.command';
import { AppHealthUpdateCustomersService } from './app-health-update-customers.service';

describe('AppHealthUpdateCustomersCommandHandler', () =>
{
    let commandHandler: AppHealthUpdateCustomersCommandHandler;
    let service: AppHealthUpdateCustomersService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthUpdateCustomersCommandHandler,
                {
                    provide : AppHealthUpdateCustomersService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthUpdateCustomersCommandHandler>(AppHealthUpdateCustomersCommandHandler);
        service = module.get<AppHealthUpdateCustomersService>(AppHealthUpdateCustomersService);
    });

    describe('main', () =>
    {
        test('UpdateCustomersCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an customers updated', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthUpdateCustomersCommand(
                    {
                        id: appHealthMockCustomerData[0].id,
                        name: appHealthMockCustomerData[0].name,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
