/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockApplicationAuthorizationData } from '@app/app-health/application-authorization/infrastructure/mock/app-health-mock-application-authorization.data';
import { AppHealthCreateApplicationAuthorizationsCommandHandler } from './app-health-create-application-authorizations.command-handler';
import { AppHealthCreateApplicationAuthorizationsCommand } from './app-health-create-application-authorizations.command';
import { AppHealthCreateApplicationAuthorizationsService } from './app-health-create-application-authorizations.service';

describe('appHealthCreateApplicationAuthorizationsCommandHandler', () =>
{
    let commandHandler: AppHealthCreateApplicationAuthorizationsCommandHandler;
    let service: AppHealthCreateApplicationAuthorizationsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateApplicationAuthorizationsCommandHandler,
                {
                    provide : AppHealthCreateApplicationAuthorizationsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthCreateApplicationAuthorizationsCommandHandler>(AppHealthCreateApplicationAuthorizationsCommandHandler);
        service = module.get<AppHealthCreateApplicationAuthorizationsService>(AppHealthCreateApplicationAuthorizationsService);
    });

    describe('main', () =>
    {
        test('AppHealthCreateApplicationAuthorizationsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return AppHealthMockApplicationAuthorizationData createds', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthCreateApplicationAuthorizationsCommand(
                    appHealthMockApplicationAuthorizationData,
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
