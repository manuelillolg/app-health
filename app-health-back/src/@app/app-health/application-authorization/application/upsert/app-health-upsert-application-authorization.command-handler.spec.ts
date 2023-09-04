import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockApplicationAuthorizationData } from '@app/app-health/application-authorization/infrastructure/mock/app-health-mock-application-authorization.data';
import { AppHealthUpsertApplicationAuthorizationCommandHandler } from './app-health-upsert-application-authorization.command-handler';
import { AppHealthUpsertApplicationAuthorizationCommand } from './app-health-upsert-application-authorization.command';
import { AppHealthUpsertApplicationAuthorizationService } from './app-health-upsert-application-authorization.service';

describe('AppHealthUpsertApplicationAuthorizationCommandHandler', () =>
{
    let commandHandler: AppHealthUpsertApplicationAuthorizationCommandHandler;
    let service: AppHealthUpsertApplicationAuthorizationService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthUpsertApplicationAuthorizationCommandHandler,
                {
                    provide : AppHealthUpsertApplicationAuthorizationService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthUpsertApplicationAuthorizationCommandHandler>(AppHealthUpsertApplicationAuthorizationCommandHandler);
        service = module.get<AppHealthUpsertApplicationAuthorizationService>(AppHealthUpsertApplicationAuthorizationService);
    });

    describe('main', () =>
    {
        test('UpsertApplicationAuthorizationCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the AppHealthUpsertApplicationAuthorizationService', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthUpsertApplicationAuthorizationCommand(
                    {
                        id: appHealthMockApplicationAuthorizationData[0].id,
                        applicationId: appHealthMockApplicationAuthorizationData[0].applicationId,
                        authorizationInterfaceId: appHealthMockApplicationAuthorizationData[0].authorizationInterfaceId,
                        totalUsers: appHealthMockApplicationAuthorizationData[0].totalUsers,
                        score: appHealthMockApplicationAuthorizationData[0].score,
                        applicationInfrastructureServiceId: appHealthMockApplicationAuthorizationData[0].applicationInfrastructureServiceId,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
