import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockInfrastructureProviderData } from '@app/app-health/infrastructure-provider/infrastructure/mock/app-health-mock-infrastructure-provider.data';
import { AppHealthUpsertInfrastructureProviderCommandHandler } from './app-health-upsert-infrastructure-provider.command-handler';
import { AppHealthUpsertInfrastructureProviderCommand } from './app-health-upsert-infrastructure-provider.command';
import { AppHealthUpsertInfrastructureProviderService } from './app-health-upsert-infrastructure-provider.service';

describe('AppHealthUpsertInfrastructureProviderCommandHandler', () =>
{
    let commandHandler: AppHealthUpsertInfrastructureProviderCommandHandler;
    let service: AppHealthUpsertInfrastructureProviderService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthUpsertInfrastructureProviderCommandHandler,
                {
                    provide : AppHealthUpsertInfrastructureProviderService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthUpsertInfrastructureProviderCommandHandler>(AppHealthUpsertInfrastructureProviderCommandHandler);
        service = module.get<AppHealthUpsertInfrastructureProviderService>(AppHealthUpsertInfrastructureProviderService);
    });

    describe('main', () =>
    {
        test('UpsertInfrastructureProviderCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the AppHealthUpsertInfrastructureProviderService', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthUpsertInfrastructureProviderCommand(
                    {
                        id: appHealthMockInfrastructureProviderData[0].id,
                        name: appHealthMockInfrastructureProviderData[0].name,
                        score: appHealthMockInfrastructureProviderData[0].score,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
