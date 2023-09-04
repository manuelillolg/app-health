import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockCustomerData } from '@app/app-health/customer/infrastructure/mock/app-health-mock-customer.data';
import { AppHealthUpsertCustomerCommandHandler } from './app-health-upsert-customer.command-handler';
import { AppHealthUpsertCustomerCommand } from './app-health-upsert-customer.command';
import { AppHealthUpsertCustomerService } from './app-health-upsert-customer.service';

describe('AppHealthUpsertCustomerCommandHandler', () =>
{
    let commandHandler: AppHealthUpsertCustomerCommandHandler;
    let service: AppHealthUpsertCustomerService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthUpsertCustomerCommandHandler,
                {
                    provide : AppHealthUpsertCustomerService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthUpsertCustomerCommandHandler>(AppHealthUpsertCustomerCommandHandler);
        service = module.get<AppHealthUpsertCustomerService>(AppHealthUpsertCustomerService);
    });

    describe('main', () =>
    {
        test('UpsertCustomerCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the AppHealthUpsertCustomerService', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthUpsertCustomerCommand(
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
