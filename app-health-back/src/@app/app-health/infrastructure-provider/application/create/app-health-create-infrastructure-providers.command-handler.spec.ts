/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockInfrastructureProviderData } from '@app/app-health/infrastructure-provider/infrastructure/mock/app-health-mock-infrastructure-provider.data';
import { AppHealthCreateInfrastructureProvidersCommandHandler } from './app-health-create-infrastructure-providers.command-handler';
import { AppHealthCreateInfrastructureProvidersCommand } from './app-health-create-infrastructure-providers.command';
import { AppHealthCreateInfrastructureProvidersService } from './app-health-create-infrastructure-providers.service';

describe('appHealthCreateInfrastructureProvidersCommandHandler', () =>
{
    let commandHandler: AppHealthCreateInfrastructureProvidersCommandHandler;
    let service: AppHealthCreateInfrastructureProvidersService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateInfrastructureProvidersCommandHandler,
                {
                    provide : AppHealthCreateInfrastructureProvidersService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthCreateInfrastructureProvidersCommandHandler>(AppHealthCreateInfrastructureProvidersCommandHandler);
        service = module.get<AppHealthCreateInfrastructureProvidersService>(AppHealthCreateInfrastructureProvidersService);
    });

    describe('main', () =>
    {
        test('AppHealthCreateInfrastructureProvidersCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return AppHealthMockInfrastructureProviderData createds', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthCreateInfrastructureProvidersCommand(
                    appHealthMockInfrastructureProviderData,
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
