import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockApplicationAuthenticationData } from '@app/app-health/application-authentication/infrastructure/mock/app-health-mock-application-authentication.data';
import { AppHealthUpsertApplicationAuthenticationCommandHandler } from './app-health-upsert-application-authentication.command-handler';
import { AppHealthUpsertApplicationAuthenticationCommand } from './app-health-upsert-application-authentication.command';
import { AppHealthUpsertApplicationAuthenticationService } from './app-health-upsert-application-authentication.service';

describe('AppHealthUpsertApplicationAuthenticationCommandHandler', () =>
{
    let commandHandler: AppHealthUpsertApplicationAuthenticationCommandHandler;
    let service: AppHealthUpsertApplicationAuthenticationService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthUpsertApplicationAuthenticationCommandHandler,
                {
                    provide : AppHealthUpsertApplicationAuthenticationService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthUpsertApplicationAuthenticationCommandHandler>(AppHealthUpsertApplicationAuthenticationCommandHandler);
        service = module.get<AppHealthUpsertApplicationAuthenticationService>(AppHealthUpsertApplicationAuthenticationService);
    });

    describe('main', () =>
    {
        test('UpsertApplicationAuthenticationCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the AppHealthUpsertApplicationAuthenticationService', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthUpsertApplicationAuthenticationCommand(
                    {
                        id: appHealthMockApplicationAuthenticationData[0].id,
                        applicationId: appHealthMockApplicationAuthenticationData[0].applicationId,
                        authenticationInterfaceId: appHealthMockApplicationAuthenticationData[0].authenticationInterfaceId,
                        totalUsers: appHealthMockApplicationAuthenticationData[0].totalUsers,
                        score: appHealthMockApplicationAuthenticationData[0].score,
                        applicationInfrastructureServiceId: appHealthMockApplicationAuthenticationData[0].applicationInfrastructureServiceId,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
