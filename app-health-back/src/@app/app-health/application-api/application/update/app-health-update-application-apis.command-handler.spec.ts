import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockApplicationApiData } from '@app/app-health/application-api/infrastructure/mock/app-health-mock-application-api.data';
import { AppHealthUpdateApplicationApisCommandHandler } from './app-health-update-application-apis.command-handler';
import { AppHealthUpdateApplicationApisCommand } from './app-health-update-application-apis.command';
import { AppHealthUpdateApplicationApisService } from './app-health-update-application-apis.service';

describe('AppHealthUpdateApplicationApisCommandHandler', () =>
{
    let commandHandler: AppHealthUpdateApplicationApisCommandHandler;
    let service: AppHealthUpdateApplicationApisService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthUpdateApplicationApisCommandHandler,
                {
                    provide : AppHealthUpdateApplicationApisService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthUpdateApplicationApisCommandHandler>(AppHealthUpdateApplicationApisCommandHandler);
        service = module.get<AppHealthUpdateApplicationApisService>(AppHealthUpdateApplicationApisService);
    });

    describe('main', () =>
    {
        test('UpdateApplicationApisCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an applicationApis updated', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthUpdateApplicationApisCommand(
                    {
                        id: appHealthMockApplicationApiData[0].id,
                        applicationId: appHealthMockApplicationApiData[0].applicationId,
                        apiInterfaceTypeId: appHealthMockApplicationApiData[0].apiInterfaceTypeId,
                        score: appHealthMockApplicationApiData[0].score,
                        documentations: appHealthMockApplicationApiData[0].documentations,
                        requestsPerDay: appHealthMockApplicationApiData[0].requestsPerDay,
                        applicationInfrastructureServiceId: appHealthMockApplicationApiData[0].applicationInfrastructureServiceId,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
