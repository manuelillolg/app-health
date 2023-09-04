import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockApplicationAuthorizationData } from '@app/app-health/application-authorization/infrastructure/mock/app-health-mock-application-authorization.data';
import { AppHealthUpdateApplicationAuthorizationsCommandHandler } from './app-health-update-application-authorizations.command-handler';
import { AppHealthUpdateApplicationAuthorizationsCommand } from './app-health-update-application-authorizations.command';
import { AppHealthUpdateApplicationAuthorizationsService } from './app-health-update-application-authorizations.service';

describe('AppHealthUpdateApplicationAuthorizationsCommandHandler', () =>
{
    let commandHandler: AppHealthUpdateApplicationAuthorizationsCommandHandler;
    let service: AppHealthUpdateApplicationAuthorizationsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthUpdateApplicationAuthorizationsCommandHandler,
                {
                    provide : AppHealthUpdateApplicationAuthorizationsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthUpdateApplicationAuthorizationsCommandHandler>(AppHealthUpdateApplicationAuthorizationsCommandHandler);
        service = module.get<AppHealthUpdateApplicationAuthorizationsService>(AppHealthUpdateApplicationAuthorizationsService);
    });

    describe('main', () =>
    {
        test('UpdateApplicationAuthorizationsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an applicationAuthorizations updated', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthUpdateApplicationAuthorizationsCommand(
                    {
                        id: appHealthMockApplicationAuthorizationData[0].id,
                        applicationId: appHealthMockApplicationAuthorizationData[0].applicationId,
                        authorizationInterfaceId: appHealthMockApplicationAuthorizationData[0].authorizationInterfaceId,
                        totalUsers: appHealthMockApplicationAuthorizationData[0].totalUsers,
                        score: appHealthMockApplicationAuthorizationData[0].score,
                        applicationInfrastructureServiceId: appHealthMockApplicationAuthorizationData[0].applicationInfrastructureServiceId,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
