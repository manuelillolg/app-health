import { AppHealthCreateApplicationApiCommandHandler } from './app-health-create-application-api.command-handler';
import { AppHealthCreateApplicationApiService } from './app-health-create-application-api.service';
import { AppHealthCreateApplicationApiCommand, appHealthMockApplicationApiData } from '@app/app-health/application-api';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateApplicationApiCommandHandler', () =>
{
    let commandHandler: AppHealthCreateApplicationApiCommandHandler;
    let service: AppHealthCreateApplicationApiService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateApplicationApiCommandHandler,
                {
                    provide : AppHealthCreateApplicationApiService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthCreateApplicationApiCommandHandler>(AppHealthCreateApplicationApiCommandHandler);
        service = module.get<AppHealthCreateApplicationApiService>(AppHealthCreateApplicationApiService);
    });

    describe('main', () =>
    {
        test('CreateApplicationApiCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the AppHealthCreateApplicationApiService', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthCreateApplicationApiCommand(
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
