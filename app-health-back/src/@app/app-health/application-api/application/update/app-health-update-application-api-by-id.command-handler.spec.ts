import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockApplicationApiData } from '@app/app-health/application-api/infrastructure/mock/app-health-mock-application-api.data';
import { AppHealthUpdateApplicationApiByIdCommandHandler } from './app-health-update-application-api-by-id.command-handler';
import { AppHealthUpdateApplicationApiByIdCommand } from './app-health-update-application-api-by-id.command';
import { AppHealthUpdateApplicationApiByIdService } from './app-health-update-application-api-by-id.service';

describe('AppHealthUpdateApplicationApiByIdCommandHandler', () =>
{
    let commandHandler: AppHealthUpdateApplicationApiByIdCommandHandler;
    let service: AppHealthUpdateApplicationApiByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthUpdateApplicationApiByIdCommandHandler,
                {
                    provide : AppHealthUpdateApplicationApiByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthUpdateApplicationApiByIdCommandHandler>(AppHealthUpdateApplicationApiByIdCommandHandler);
        service = module.get<AppHealthUpdateApplicationApiByIdService>(AppHealthUpdateApplicationApiByIdService);
    });

    describe('main', () =>
    {
        test('UpdateApplicationApiByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an applicationApi created', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthUpdateApplicationApiByIdCommand(
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
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
