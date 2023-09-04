import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockApplicationInfrastructureServiceData } from '@app/app-health/application-infrastructure-service/infrastructure/mock/app-health-mock-application-infrastructure-service.data';
import { AppHealthUpdateApplicationInfrastructureServiceByIdCommandHandler } from './app-health-update-application-infrastructure-service-by-id.command-handler';
import { AppHealthUpdateApplicationInfrastructureServiceByIdCommand } from './app-health-update-application-infrastructure-service-by-id.command';
import { AppHealthUpdateApplicationInfrastructureServiceByIdService } from './app-health-update-application-infrastructure-service-by-id.service';

describe('AppHealthUpdateApplicationInfrastructureServiceByIdCommandHandler', () =>
{
    let commandHandler: AppHealthUpdateApplicationInfrastructureServiceByIdCommandHandler;
    let service: AppHealthUpdateApplicationInfrastructureServiceByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthUpdateApplicationInfrastructureServiceByIdCommandHandler,
                {
                    provide : AppHealthUpdateApplicationInfrastructureServiceByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthUpdateApplicationInfrastructureServiceByIdCommandHandler>(AppHealthUpdateApplicationInfrastructureServiceByIdCommandHandler);
        service = module.get<AppHealthUpdateApplicationInfrastructureServiceByIdService>(AppHealthUpdateApplicationInfrastructureServiceByIdService);
    });

    describe('main', () =>
    {
        test('UpdateApplicationInfrastructureServiceByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an applicationInfrastructureService created', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthUpdateApplicationInfrastructureServiceByIdCommand(
                    {
                        id: appHealthMockApplicationInfrastructureServiceData[0].id,
                        applicationId: appHealthMockApplicationInfrastructureServiceData[0].applicationId,
                        infrastructureServiceId: appHealthMockApplicationInfrastructureServiceData[0].infrastructureServiceId,
                        averageCostPerYear: appHealthMockApplicationInfrastructureServiceData[0].averageCostPerYear,
                        score: appHealthMockApplicationInfrastructureServiceData[0].score,
                    },
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
