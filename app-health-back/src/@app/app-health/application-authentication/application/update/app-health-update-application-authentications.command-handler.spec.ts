import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockApplicationAuthenticationData } from '@app/app-health/application-authentication/infrastructure/mock/app-health-mock-application-authentication.data';
import { AppHealthUpdateApplicationAuthenticationsCommandHandler } from './app-health-update-application-authentications.command-handler';
import { AppHealthUpdateApplicationAuthenticationsCommand } from './app-health-update-application-authentications.command';
import { AppHealthUpdateApplicationAuthenticationsService } from './app-health-update-application-authentications.service';

describe('AppHealthUpdateApplicationAuthenticationsCommandHandler', () =>
{
    let commandHandler: AppHealthUpdateApplicationAuthenticationsCommandHandler;
    let service: AppHealthUpdateApplicationAuthenticationsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthUpdateApplicationAuthenticationsCommandHandler,
                {
                    provide : AppHealthUpdateApplicationAuthenticationsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthUpdateApplicationAuthenticationsCommandHandler>(AppHealthUpdateApplicationAuthenticationsCommandHandler);
        service = module.get<AppHealthUpdateApplicationAuthenticationsService>(AppHealthUpdateApplicationAuthenticationsService);
    });

    describe('main', () =>
    {
        test('UpdateApplicationAuthenticationsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an applicationAuthentications updated', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthUpdateApplicationAuthenticationsCommand(
                    {
                        id: appHealthMockApplicationAuthenticationData[0].id,
                        applicationId: appHealthMockApplicationAuthenticationData[0].applicationId,
                        authenticationInterfaceId: appHealthMockApplicationAuthenticationData[0].authenticationInterfaceId,
                        totalUsers: appHealthMockApplicationAuthenticationData[0].totalUsers,
                        score: appHealthMockApplicationAuthenticationData[0].score,
                        applicationInfrastructureServiceId: appHealthMockApplicationAuthenticationData[0].applicationInfrastructureServiceId,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
