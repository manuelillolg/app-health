/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockApplicationAuthenticationData } from '@app/app-health/application-authentication/infrastructure/mock/app-health-mock-application-authentication.data';
import { AppHealthCreateApplicationAuthenticationsCommandHandler } from './app-health-create-application-authentications.command-handler';
import { AppHealthCreateApplicationAuthenticationsCommand } from './app-health-create-application-authentications.command';
import { AppHealthCreateApplicationAuthenticationsService } from './app-health-create-application-authentications.service';

describe('appHealthCreateApplicationAuthenticationsCommandHandler', () =>
{
    let commandHandler: AppHealthCreateApplicationAuthenticationsCommandHandler;
    let service: AppHealthCreateApplicationAuthenticationsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateApplicationAuthenticationsCommandHandler,
                {
                    provide : AppHealthCreateApplicationAuthenticationsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthCreateApplicationAuthenticationsCommandHandler>(AppHealthCreateApplicationAuthenticationsCommandHandler);
        service = module.get<AppHealthCreateApplicationAuthenticationsService>(AppHealthCreateApplicationAuthenticationsService);
    });

    describe('main', () =>
    {
        test('AppHealthCreateApplicationAuthenticationsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return AppHealthMockApplicationAuthenticationData createds', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthCreateApplicationAuthenticationsCommand(
                    appHealthMockApplicationAuthenticationData,
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
