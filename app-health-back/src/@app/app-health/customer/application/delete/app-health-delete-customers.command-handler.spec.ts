import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthDeleteCustomersCommandHandler } from './app-health-delete-customers.command-handler';
import { AppHealthDeleteCustomersCommand } from './app-health-delete-customers.command';
import { AppHealthDeleteCustomersService } from './app-health-delete-customers.service';

describe('AppHealthDeleteCustomersCommandHandler', () =>
{
    let commandHandler: AppHealthDeleteCustomersCommandHandler;
    let service: AppHealthDeleteCustomersService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthDeleteCustomersCommandHandler,
                {
                    provide : AppHealthDeleteCustomersService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthDeleteCustomersCommandHandler>(AppHealthDeleteCustomersCommandHandler);
        service = module.get<AppHealthDeleteCustomersService>(AppHealthDeleteCustomersService);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteCustomersCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthDeleteCustomersCommand(),
            )).toBe(undefined);
        });
    });
});
