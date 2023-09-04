import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockApplicationInfrastructureServiceData } from '@app/app-health/application-infrastructure-service/infrastructure/mock/app-health-mock-application-infrastructure-service.data';
import { AppHealthUpsertApplicationInfrastructureServiceCommandHandler } from './app-health-upsert-application-infrastructure-service.command-handler';
import { AppHealthUpsertApplicationInfrastructureServiceCommand } from './app-health-upsert-application-infrastructure-service.command';
import { AppHealthUpsertApplicationInfrastructureServiceService } from './app-health-upsert-application-infrastructure-service.service';

describe('AppHealthUpsertApplicationInfrastructureServiceCommandHandler', () =>
{
    let commandHandler: AppHealthUpsertApplicationInfrastructureServiceCommandHandler;
    let service: AppHealthUpsertApplicationInfrastructureServiceService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthUpsertApplicationInfrastructureServiceCommandHandler,
                {
                    provide : AppHealthUpsertApplicationInfrastructureServiceService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthUpsertApplicationInfrastructureServiceCommandHandler>(AppHealthUpsertApplicationInfrastructureServiceCommandHandler);
        service = module.get<AppHealthUpsertApplicationInfrastructureServiceService>(AppHealthUpsertApplicationInfrastructureServiceService);
    });

    describe('main', () =>
    {
        test('UpsertApplicationInfrastructureServiceCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the AppHealthUpsertApplicationInfrastructureServiceService', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthUpsertApplicationInfrastructureServiceCommand(
                    {
                        id: appHealthMockApplicationInfrastructureServiceData[0].id,
                        applicationId: appHealthMockApplicationInfrastructureServiceData[0].applicationId,
                        infrastructureServiceId: appHealthMockApplicationInfrastructureServiceData[0].infrastructureServiceId,
                        averageCostPerYear: appHealthMockApplicationInfrastructureServiceData[0].averageCostPerYear,
                        score: appHealthMockApplicationInfrastructureServiceData[0].score,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
