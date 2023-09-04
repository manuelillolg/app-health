import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthDeleteInfrastructureProviderByIdCommandHandler } from './app-health-delete-infrastructure-provider-by-id.command-handler';
import { appHealthMockInfrastructureProviderData } from '@app/app-health/infrastructure-provider/infrastructure/mock/app-health-mock-infrastructure-provider.data';
import { AppHealthDeleteInfrastructureProviderByIdCommand } from './app-health-delete-infrastructure-provider-by-id.command';
import { AppHealthDeleteInfrastructureProviderByIdService } from './app-health-delete-infrastructure-provider-by-id.service';

describe('AppHealthDeleteInfrastructureProviderByIdCommandHandler', () =>
{
    let commandHandler: AppHealthDeleteInfrastructureProviderByIdCommandHandler;
    let service: AppHealthDeleteInfrastructureProviderByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthDeleteInfrastructureProviderByIdCommandHandler,
                {
                    provide : AppHealthDeleteInfrastructureProviderByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthDeleteInfrastructureProviderByIdCommandHandler>(AppHealthDeleteInfrastructureProviderByIdCommandHandler);
        service = module.get<AppHealthDeleteInfrastructureProviderByIdService>(AppHealthDeleteInfrastructureProviderByIdService);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteInfrastructureProviderByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the AppHealthDeleteInfrastructureProviderByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthDeleteInfrastructureProviderByIdCommand(
                    appHealthMockInfrastructureProviderData[0].id,
                ),
            )).toBe(undefined);
        });
    });
});
