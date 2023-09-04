import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockApplicationApiData } from '@app/app-health/application-api/infrastructure/mock/app-health-mock-application-api.data';
import { AppHealthUpsertApplicationApiCommandHandler } from './app-health-upsert-application-api.command-handler';
import { AppHealthUpsertApplicationApiCommand } from './app-health-upsert-application-api.command';
import { AppHealthUpsertApplicationApiService } from './app-health-upsert-application-api.service';

describe('AppHealthUpsertApplicationApiCommandHandler', () =>
{
    let commandHandler: AppHealthUpsertApplicationApiCommandHandler;
    let service: AppHealthUpsertApplicationApiService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthUpsertApplicationApiCommandHandler,
                {
                    provide : AppHealthUpsertApplicationApiService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthUpsertApplicationApiCommandHandler>(AppHealthUpsertApplicationApiCommandHandler);
        service = module.get<AppHealthUpsertApplicationApiService>(AppHealthUpsertApplicationApiService);
    });

    describe('main', () =>
    {
        test('UpsertApplicationApiCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the AppHealthUpsertApplicationApiService', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthUpsertApplicationApiCommand(
                    {
                        id: appHealthMockApplicationApiData[0].id,
                        applicationId: appHealthMockApplicationApiData[0].applicationId,
                        apiInterfaceTypeId: appHealthMockApplicationApiData[0].apiInterfaceTypeId,
                        score: appHealthMockApplicationApiData[0].score,
                        documentations: appHealthMockApplicationApiData[0].documentations,
                        requestsPerDay: appHealthMockApplicationApiData[0].requestsPerDay,
                        applicationInfrastructureServiceId: appHealthMockApplicationApiData[0].applicationInfrastructureServiceId,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
