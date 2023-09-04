import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockApplicationInfrastructureServiceData } from '@app/app-health/application-infrastructure-service/infrastructure/mock/app-health-mock-application-infrastructure-service.data';
import { AppHealthUpdateApplicationInfrastuctureServicesCommandHandler } from './app-health-update-application-infrastucture-services.command-handler';
import { AppHealthUpdateApplicationInfrastuctureServicesCommand } from './app-health-update-application-infrastucture-services.command';
import { AppHealthUpdateApplicationInfrastuctureServicesService } from './app-health-update-application-infrastucture-services.service';

describe('AppHealthUpdateApplicationInfrastuctureServicesCommandHandler', () =>
{
    let commandHandler: AppHealthUpdateApplicationInfrastuctureServicesCommandHandler;
    let service: AppHealthUpdateApplicationInfrastuctureServicesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthUpdateApplicationInfrastuctureServicesCommandHandler,
                {
                    provide : AppHealthUpdateApplicationInfrastuctureServicesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthUpdateApplicationInfrastuctureServicesCommandHandler>(AppHealthUpdateApplicationInfrastuctureServicesCommandHandler);
        service = module.get<AppHealthUpdateApplicationInfrastuctureServicesService>(AppHealthUpdateApplicationInfrastuctureServicesService);
    });

    describe('main', () =>
    {
        test('UpdateApplicationInfrastuctureServicesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an applicationInfrastuctureServices updated', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthUpdateApplicationInfrastuctureServicesCommand(
                    {
                        id: appHealthMockApplicationInfrastructureServiceData[0].id,
                        applicationId: appHealthMockApplicationInfrastructureServiceData[0].applicationId,
                        infrastructureServiceId: appHealthMockApplicationInfrastructureServiceData[0].infrastructureServiceId,
                        averageCostPerYear: appHealthMockApplicationInfrastructureServiceData[0].averageCostPerYear,
                        score: appHealthMockApplicationInfrastructureServiceData[0].score,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
