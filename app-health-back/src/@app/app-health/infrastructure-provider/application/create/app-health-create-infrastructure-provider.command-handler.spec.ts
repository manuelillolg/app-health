import { AppHealthCreateInfrastructureProviderCommandHandler } from './app-health-create-infrastructure-provider.command-handler';
import { AppHealthCreateInfrastructureProviderService } from './app-health-create-infrastructure-provider.service';
import { AppHealthCreateInfrastructureProviderCommand, appHealthMockInfrastructureProviderData } from '@app/app-health/infrastructure-provider';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateInfrastructureProviderCommandHandler', () =>
{
    let commandHandler: AppHealthCreateInfrastructureProviderCommandHandler;
    let service: AppHealthCreateInfrastructureProviderService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateInfrastructureProviderCommandHandler,
                {
                    provide : AppHealthCreateInfrastructureProviderService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthCreateInfrastructureProviderCommandHandler>(AppHealthCreateInfrastructureProviderCommandHandler);
        service = module.get<AppHealthCreateInfrastructureProviderService>(AppHealthCreateInfrastructureProviderService);
    });

    describe('main', () =>
    {
        test('CreateInfrastructureProviderCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the AppHealthCreateInfrastructureProviderService', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthCreateInfrastructureProviderCommand(
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
