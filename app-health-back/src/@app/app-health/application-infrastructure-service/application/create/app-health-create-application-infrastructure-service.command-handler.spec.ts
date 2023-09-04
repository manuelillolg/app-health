import { AppHealthCreateApplicationInfrastructureServiceCommandHandler } from './app-health-create-application-infrastructure-service.command-handler';
import { AppHealthCreateApplicationInfrastructureServiceService } from './app-health-create-application-infrastructure-service.service';
import { AppHealthCreateApplicationInfrastructureServiceCommand, appHealthMockApplicationInfrastructureServiceData } from '@app/app-health/application-infrastructure-service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateApplicationInfrastructureServiceCommandHandler', () =>
{
    let commandHandler: AppHealthCreateApplicationInfrastructureServiceCommandHandler;
    let service: AppHealthCreateApplicationInfrastructureServiceService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateApplicationInfrastructureServiceCommandHandler,
                {
                    provide : AppHealthCreateApplicationInfrastructureServiceService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthCreateApplicationInfrastructureServiceCommandHandler>(AppHealthCreateApplicationInfrastructureServiceCommandHandler);
        service = module.get<AppHealthCreateApplicationInfrastructureServiceService>(AppHealthCreateApplicationInfrastructureServiceService);
    });

    describe('main', () =>
    {
        test('CreateApplicationInfrastructureServiceCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the AppHealthCreateApplicationInfrastructureServiceService', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthCreateApplicationInfrastructureServiceCommand(
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
