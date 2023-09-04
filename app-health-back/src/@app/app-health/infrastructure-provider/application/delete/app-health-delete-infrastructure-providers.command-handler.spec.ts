import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthDeleteInfrastructureProvidersCommandHandler } from './app-health-delete-infrastructure-providers.command-handler';
import { AppHealthDeleteInfrastructureProvidersCommand } from './app-health-delete-infrastructure-providers.command';
import { AppHealthDeleteInfrastructureProvidersService } from './app-health-delete-infrastructure-providers.service';

describe('AppHealthDeleteInfrastructureProvidersCommandHandler', () =>
{
    let commandHandler: AppHealthDeleteInfrastructureProvidersCommandHandler;
    let service: AppHealthDeleteInfrastructureProvidersService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthDeleteInfrastructureProvidersCommandHandler,
                {
                    provide : AppHealthDeleteInfrastructureProvidersService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthDeleteInfrastructureProvidersCommandHandler>(AppHealthDeleteInfrastructureProvidersCommandHandler);
        service = module.get<AppHealthDeleteInfrastructureProvidersService>(AppHealthDeleteInfrastructureProvidersService);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteInfrastructureProvidersCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthDeleteInfrastructureProvidersCommand(),
            )).toBe(undefined);
        });
    });
});
