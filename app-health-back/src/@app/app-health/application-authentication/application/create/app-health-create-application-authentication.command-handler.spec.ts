import { AppHealthCreateApplicationAuthenticationCommandHandler } from './app-health-create-application-authentication.command-handler';
import { AppHealthCreateApplicationAuthenticationService } from './app-health-create-application-authentication.service';
import { AppHealthCreateApplicationAuthenticationCommand, appHealthMockApplicationAuthenticationData } from '@app/app-health/application-authentication';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateApplicationAuthenticationCommandHandler', () =>
{
    let commandHandler: AppHealthCreateApplicationAuthenticationCommandHandler;
    let service: AppHealthCreateApplicationAuthenticationService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateApplicationAuthenticationCommandHandler,
                {
                    provide : AppHealthCreateApplicationAuthenticationService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthCreateApplicationAuthenticationCommandHandler>(AppHealthCreateApplicationAuthenticationCommandHandler);
        service = module.get<AppHealthCreateApplicationAuthenticationService>(AppHealthCreateApplicationAuthenticationService);
    });

    describe('main', () =>
    {
        test('CreateApplicationAuthenticationCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the AppHealthCreateApplicationAuthenticationService', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthCreateApplicationAuthenticationCommand(
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
