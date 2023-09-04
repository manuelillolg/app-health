import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockInfrastructureServiceData } from '@app/app-health/infrastructure-service/infrastructure/mock/app-health-mock-infrastructure-service.data';
import { AppHealthUpsertInfrastructureServiceCommandHandler } from './app-health-upsert-infrastructure-service.command-handler';
import { AppHealthUpsertInfrastructureServiceCommand } from './app-health-upsert-infrastructure-service.command';
import { AppHealthUpsertInfrastructureServiceService } from './app-health-upsert-infrastructure-service.service';

describe('AppHealthUpsertInfrastructureServiceCommandHandler', () =>
{
    let commandHandler: AppHealthUpsertInfrastructureServiceCommandHandler;
    let service: AppHealthUpsertInfrastructureServiceService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthUpsertInfrastructureServiceCommandHandler,
                {
                    provide : AppHealthUpsertInfrastructureServiceService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthUpsertInfrastructureServiceCommandHandler>(AppHealthUpsertInfrastructureServiceCommandHandler);
        service = module.get<AppHealthUpsertInfrastructureServiceService>(AppHealthUpsertInfrastructureServiceService);
    });

    describe('main', () =>
    {
        test('UpsertInfrastructureServiceCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the AppHealthUpsertInfrastructureServiceService', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthUpsertInfrastructureServiceCommand(
                    {
                        id: appHealthMockInfrastructureServiceData[0].id,
                        providerId: appHealthMockInfrastructureServiceData[0].providerId,
                        name: appHealthMockInfrastructureServiceData[0].name,
                        score: appHealthMockInfrastructureServiceData[0].score,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
