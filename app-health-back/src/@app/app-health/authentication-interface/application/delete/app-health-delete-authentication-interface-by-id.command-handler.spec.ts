import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthDeleteAuthenticationInterfaceByIdCommandHandler } from './app-health-delete-authentication-interface-by-id.command-handler';
import { appHealthMockAuthenticationInterfaceData } from '@app/app-health/authentication-interface/infrastructure/mock/app-health-mock-authentication-interface.data';
import { AppHealthDeleteAuthenticationInterfaceByIdCommand } from './app-health-delete-authentication-interface-by-id.command';
import { AppHealthDeleteAuthenticationInterfaceByIdService } from './app-health-delete-authentication-interface-by-id.service';

describe('AppHealthDeleteAuthenticationInterfaceByIdCommandHandler', () =>
{
    let commandHandler: AppHealthDeleteAuthenticationInterfaceByIdCommandHandler;
    let service: AppHealthDeleteAuthenticationInterfaceByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthDeleteAuthenticationInterfaceByIdCommandHandler,
                {
                    provide : AppHealthDeleteAuthenticationInterfaceByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthDeleteAuthenticationInterfaceByIdCommandHandler>(AppHealthDeleteAuthenticationInterfaceByIdCommandHandler);
        service = module.get<AppHealthDeleteAuthenticationInterfaceByIdService>(AppHealthDeleteAuthenticationInterfaceByIdService);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteAuthenticationInterfaceByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the AppHealthDeleteAuthenticationInterfaceByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthDeleteAuthenticationInterfaceByIdCommand(
                    appHealthMockAuthenticationInterfaceData[0].id,
                ),
            )).toBe(undefined);
        });
    });
});
