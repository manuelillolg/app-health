import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockCustomerData } from '@app/app-health/customer/infrastructure/mock/app-health-mock-customer.data';
import { AppHealthUpdateCustomerByIdCommandHandler } from './app-health-update-customer-by-id.command-handler';
import { AppHealthUpdateCustomerByIdCommand } from './app-health-update-customer-by-id.command';
import { AppHealthUpdateCustomerByIdService } from './app-health-update-customer-by-id.service';

describe('AppHealthUpdateCustomerByIdCommandHandler', () =>
{
    let commandHandler: AppHealthUpdateCustomerByIdCommandHandler;
    let service: AppHealthUpdateCustomerByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthUpdateCustomerByIdCommandHandler,
                {
                    provide : AppHealthUpdateCustomerByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthUpdateCustomerByIdCommandHandler>(AppHealthUpdateCustomerByIdCommandHandler);
        service = module.get<AppHealthUpdateCustomerByIdService>(AppHealthUpdateCustomerByIdService);
    });

    describe('main', () =>
    {
        test('UpdateCustomerByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an customer created', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthUpdateCustomerByIdCommand(
                    {
                        id: appHealthMockCustomerData[0].id,
                        name: appHealthMockCustomerData[0].name,
                    },
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
