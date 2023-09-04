import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthDeleteInfrastructureServicesCommandHandler } from './app-health-delete-infrastructure-services.command-handler';
import { AppHealthDeleteInfrastructureServicesCommand } from './app-health-delete-infrastructure-services.command';
import { AppHealthDeleteInfrastructureServicesService } from './app-health-delete-infrastructure-services.service';

describe('AppHealthDeleteInfrastructureServicesCommandHandler', () =>
{
    let commandHandler: AppHealthDeleteInfrastructureServicesCommandHandler;
    let service: AppHealthDeleteInfrastructureServicesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthDeleteInfrastructureServicesCommandHandler,
                {
                    provide : AppHealthDeleteInfrastructureServicesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthDeleteInfrastructureServicesCommandHandler>(AppHealthDeleteInfrastructureServicesCommandHandler);
        service = module.get<AppHealthDeleteInfrastructureServicesService>(AppHealthDeleteInfrastructureServicesService);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteInfrastructureServicesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthDeleteInfrastructureServicesCommand(),
            )).toBe(undefined);
        });
    });
});
