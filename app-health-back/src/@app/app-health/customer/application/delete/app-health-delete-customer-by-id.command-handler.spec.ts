import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthDeleteCustomerByIdCommandHandler } from './app-health-delete-customer-by-id.command-handler';
import { appHealthMockCustomerData } from '@app/app-health/customer/infrastructure/mock/app-health-mock-customer.data';
import { AppHealthDeleteCustomerByIdCommand } from './app-health-delete-customer-by-id.command';
import { AppHealthDeleteCustomerByIdService } from './app-health-delete-customer-by-id.service';

describe('AppHealthDeleteCustomerByIdCommandHandler', () =>
{
    let commandHandler: AppHealthDeleteCustomerByIdCommandHandler;
    let service: AppHealthDeleteCustomerByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthDeleteCustomerByIdCommandHandler,
                {
                    provide : AppHealthDeleteCustomerByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthDeleteCustomerByIdCommandHandler>(AppHealthDeleteCustomerByIdCommandHandler);
        service = module.get<AppHealthDeleteCustomerByIdService>(AppHealthDeleteCustomerByIdService);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteCustomerByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the AppHealthDeleteCustomerByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthDeleteCustomerByIdCommand(
                    appHealthMockCustomerData[0].id,
                ),
            )).toBe(undefined);
        });
    });
});
