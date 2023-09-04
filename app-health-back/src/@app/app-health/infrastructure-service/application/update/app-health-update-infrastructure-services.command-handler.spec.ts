import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockInfrastructureServiceData } from '@app/app-health/infrastructure-service/infrastructure/mock/app-health-mock-infrastructure-service.data';
import { AppHealthUpdateInfrastructureServicesCommandHandler } from './app-health-update-infrastructure-services.command-handler';
import { AppHealthUpdateInfrastructureServicesCommand } from './app-health-update-infrastructure-services.command';
import { AppHealthUpdateInfrastructureServicesService } from './app-health-update-infrastructure-services.service';

describe('AppHealthUpdateInfrastructureServicesCommandHandler', () =>
{
    let commandHandler: AppHealthUpdateInfrastructureServicesCommandHandler;
    let service: AppHealthUpdateInfrastructureServicesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthUpdateInfrastructureServicesCommandHandler,
                {
                    provide : AppHealthUpdateInfrastructureServicesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthUpdateInfrastructureServicesCommandHandler>(AppHealthUpdateInfrastructureServicesCommandHandler);
        service = module.get<AppHealthUpdateInfrastructureServicesService>(AppHealthUpdateInfrastructureServicesService);
    });

    describe('main', () =>
    {
        test('UpdateInfrastructureServicesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an infrastructureServices updated', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthUpdateInfrastructureServicesCommand(
                    {
                        id: appHealthMockInfrastructureServiceData[0].id,
                        providerId: appHealthMockInfrastructureServiceData[0].providerId,
                        name: appHealthMockInfrastructureServiceData[0].name,
                        score: appHealthMockInfrastructureServiceData[0].score,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
