import { AppHealthCreateApplicationAuthorizationCommandHandler } from './app-health-create-application-authorization.command-handler';
import { AppHealthCreateApplicationAuthorizationService } from './app-health-create-application-authorization.service';
import { AppHealthCreateApplicationAuthorizationCommand, appHealthMockApplicationAuthorizationData } from '@app/app-health/application-authorization';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateApplicationAuthorizationCommandHandler', () =>
{
    let commandHandler: AppHealthCreateApplicationAuthorizationCommandHandler;
    let service: AppHealthCreateApplicationAuthorizationService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateApplicationAuthorizationCommandHandler,
                {
                    provide : AppHealthCreateApplicationAuthorizationService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthCreateApplicationAuthorizationCommandHandler>(AppHealthCreateApplicationAuthorizationCommandHandler);
        service = module.get<AppHealthCreateApplicationAuthorizationService>(AppHealthCreateApplicationAuthorizationService);
    });

    describe('main', () =>
    {
        test('CreateApplicationAuthorizationCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the AppHealthCreateApplicationAuthorizationService', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthCreateApplicationAuthorizationCommand(
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
