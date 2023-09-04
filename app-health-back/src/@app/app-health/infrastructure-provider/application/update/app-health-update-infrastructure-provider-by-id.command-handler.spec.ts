import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockInfrastructureProviderData } from '@app/app-health/infrastructure-provider/infrastructure/mock/app-health-mock-infrastructure-provider.data';
import { AppHealthUpdateInfrastructureProviderByIdCommandHandler } from './app-health-update-infrastructure-provider-by-id.command-handler';
import { AppHealthUpdateInfrastructureProviderByIdCommand } from './app-health-update-infrastructure-provider-by-id.command';
import { AppHealthUpdateInfrastructureProviderByIdService } from './app-health-update-infrastructure-provider-by-id.service';

describe('AppHealthUpdateInfrastructureProviderByIdCommandHandler', () =>
{
    let commandHandler: AppHealthUpdateInfrastructureProviderByIdCommandHandler;
    let service: AppHealthUpdateInfrastructureProviderByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthUpdateInfrastructureProviderByIdCommandHandler,
                {
                    provide : AppHealthUpdateInfrastructureProviderByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthUpdateInfrastructureProviderByIdCommandHandler>(AppHealthUpdateInfrastructureProviderByIdCommandHandler);
        service = module.get<AppHealthUpdateInfrastructureProviderByIdService>(AppHealthUpdateInfrastructureProviderByIdService);
    });

    describe('main', () =>
    {
        test('UpdateInfrastructureProviderByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an infrastructureProvider created', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthUpdateInfrastructureProviderByIdCommand(
                    {
                        id: appHealthMockInfrastructureProviderData[0].id,
                        name: appHealthMockInfrastructureProviderData[0].name,
                        score: appHealthMockInfrastructureProviderData[0].score,
                    },
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
