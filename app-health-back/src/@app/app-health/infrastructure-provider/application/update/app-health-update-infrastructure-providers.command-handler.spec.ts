import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockInfrastructureProviderData } from '@app/app-health/infrastructure-provider/infrastructure/mock/app-health-mock-infrastructure-provider.data';
import { AppHealthUpdateInfrastructureProvidersCommandHandler } from './app-health-update-infrastructure-providers.command-handler';
import { AppHealthUpdateInfrastructureProvidersCommand } from './app-health-update-infrastructure-providers.command';
import { AppHealthUpdateInfrastructureProvidersService } from './app-health-update-infrastructure-providers.service';

describe('AppHealthUpdateInfrastructureProvidersCommandHandler', () =>
{
    let commandHandler: AppHealthUpdateInfrastructureProvidersCommandHandler;
    let service: AppHealthUpdateInfrastructureProvidersService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthUpdateInfrastructureProvidersCommandHandler,
                {
                    provide : AppHealthUpdateInfrastructureProvidersService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthUpdateInfrastructureProvidersCommandHandler>(AppHealthUpdateInfrastructureProvidersCommandHandler);
        service = module.get<AppHealthUpdateInfrastructureProvidersService>(AppHealthUpdateInfrastructureProvidersService);
    });

    describe('main', () =>
    {
        test('UpdateInfrastructureProvidersCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an infrastructureProviders updated', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthUpdateInfrastructureProvidersCommand(
                    {
                        id: appHealthMockInfrastructureProviderData[0].id,
                        name: appHealthMockInfrastructureProviderData[0].name,
                        score: appHealthMockInfrastructureProviderData[0].score,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
