import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthDeleteApplicationAuthenticationByIdCommandHandler } from './app-health-delete-application-authentication-by-id.command-handler';
import { appHealthMockApplicationAuthenticationData } from '@app/app-health/application-authentication/infrastructure/mock/app-health-mock-application-authentication.data';
import { AppHealthDeleteApplicationAuthenticationByIdCommand } from './app-health-delete-application-authentication-by-id.command';
import { AppHealthDeleteApplicationAuthenticationByIdService } from './app-health-delete-application-authentication-by-id.service';

describe('AppHealthDeleteApplicationAuthenticationByIdCommandHandler', () =>
{
    let commandHandler: AppHealthDeleteApplicationAuthenticationByIdCommandHandler;
    let service: AppHealthDeleteApplicationAuthenticationByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthDeleteApplicationAuthenticationByIdCommandHandler,
                {
                    provide : AppHealthDeleteApplicationAuthenticationByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthDeleteApplicationAuthenticationByIdCommandHandler>(AppHealthDeleteApplicationAuthenticationByIdCommandHandler);
        service = module.get<AppHealthDeleteApplicationAuthenticationByIdService>(AppHealthDeleteApplicationAuthenticationByIdService);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteApplicationAuthenticationByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the AppHealthDeleteApplicationAuthenticationByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthDeleteApplicationAuthenticationByIdCommand(
                    appHealthMockApplicationAuthenticationData[0].id,
                ),
            )).toBe(undefined);
        });
    });
});
