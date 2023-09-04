import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockApplicationAuthenticationData } from '@app/app-health/application-authentication/infrastructure/mock/app-health-mock-application-authentication.data';
import { AppHealthUpdateApplicationAuthenticationByIdCommandHandler } from './app-health-update-application-authentication-by-id.command-handler';
import { AppHealthUpdateApplicationAuthenticationByIdCommand } from './app-health-update-application-authentication-by-id.command';
import { AppHealthUpdateApplicationAuthenticationByIdService } from './app-health-update-application-authentication-by-id.service';

describe('AppHealthUpdateApplicationAuthenticationByIdCommandHandler', () =>
{
    let commandHandler: AppHealthUpdateApplicationAuthenticationByIdCommandHandler;
    let service: AppHealthUpdateApplicationAuthenticationByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthUpdateApplicationAuthenticationByIdCommandHandler,
                {
                    provide : AppHealthUpdateApplicationAuthenticationByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthUpdateApplicationAuthenticationByIdCommandHandler>(AppHealthUpdateApplicationAuthenticationByIdCommandHandler);
        service = module.get<AppHealthUpdateApplicationAuthenticationByIdService>(AppHealthUpdateApplicationAuthenticationByIdService);
    });

    describe('main', () =>
    {
        test('UpdateApplicationAuthenticationByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an applicationAuthentication created', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthUpdateApplicationAuthenticationByIdCommand(
                    {
                        id: appHealthMockApplicationAuthenticationData[0].id,
                        applicationId: appHealthMockApplicationAuthenticationData[0].applicationId,
                        authenticationInterfaceId: appHealthMockApplicationAuthenticationData[0].authenticationInterfaceId,
                        totalUsers: appHealthMockApplicationAuthenticationData[0].totalUsers,
                        score: appHealthMockApplicationAuthenticationData[0].score,
                        applicationInfrastructureServiceId: appHealthMockApplicationAuthenticationData[0].applicationInfrastructureServiceId,
                    },
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
