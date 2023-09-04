import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockApplicationAuthorizationData } from '@app/app-health/application-authorization/infrastructure/mock/app-health-mock-application-authorization.data';
import { AppHealthUpdateApplicationAuthorizationByIdCommandHandler } from './app-health-update-application-authorization-by-id.command-handler';
import { AppHealthUpdateApplicationAuthorizationByIdCommand } from './app-health-update-application-authorization-by-id.command';
import { AppHealthUpdateApplicationAuthorizationByIdService } from './app-health-update-application-authorization-by-id.service';

describe('AppHealthUpdateApplicationAuthorizationByIdCommandHandler', () =>
{
    let commandHandler: AppHealthUpdateApplicationAuthorizationByIdCommandHandler;
    let service: AppHealthUpdateApplicationAuthorizationByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthUpdateApplicationAuthorizationByIdCommandHandler,
                {
                    provide : AppHealthUpdateApplicationAuthorizationByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthUpdateApplicationAuthorizationByIdCommandHandler>(AppHealthUpdateApplicationAuthorizationByIdCommandHandler);
        service = module.get<AppHealthUpdateApplicationAuthorizationByIdService>(AppHealthUpdateApplicationAuthorizationByIdService);
    });

    describe('main', () =>
    {
        test('UpdateApplicationAuthorizationByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an applicationAuthorization created', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthUpdateApplicationAuthorizationByIdCommand(
                    {
                        id: appHealthMockApplicationAuthorizationData[0].id,
                        applicationId: appHealthMockApplicationAuthorizationData[0].applicationId,
                        authorizationInterfaceId: appHealthMockApplicationAuthorizationData[0].authorizationInterfaceId,
                        totalUsers: appHealthMockApplicationAuthorizationData[0].totalUsers,
                        score: appHealthMockApplicationAuthorizationData[0].score,
                        applicationInfrastructureServiceId: appHealthMockApplicationAuthorizationData[0].applicationInfrastructureServiceId,
                    },
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
