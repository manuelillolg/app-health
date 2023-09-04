import { AppHealthCreateCustomerCommandHandler } from './app-health-create-customer.command-handler';
import { AppHealthCreateCustomerService } from './app-health-create-customer.service';
import { AppHealthCreateCustomerCommand, appHealthMockCustomerData } from '@app/app-health/customer';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateCustomerCommandHandler', () =>
{
    let commandHandler: AppHealthCreateCustomerCommandHandler;
    let service: AppHealthCreateCustomerService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateCustomerCommandHandler,
                {
                    provide : AppHealthCreateCustomerService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthCreateCustomerCommandHandler>(AppHealthCreateCustomerCommandHandler);
        service = module.get<AppHealthCreateCustomerService>(AppHealthCreateCustomerService);
    });

    describe('main', () =>
    {
        test('CreateCustomerCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the AppHealthCreateCustomerService', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthCreateCustomerCommand(
                    {
                        id: appHealthMockCustomerData[0].id,
                        name: appHealthMockCustomerData[0].name,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
