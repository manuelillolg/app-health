import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthDeleteAuthorizationInterfaceByIdCommandHandler } from './app-health-delete-authorization-interface-by-id.command-handler';
import { appHealthMockAuthorizationInterfaceData } from '@app/app-health/authorization-interface/infrastructure/mock/app-health-mock-authorization-interface.data';
import { AppHealthDeleteAuthorizationInterfaceByIdCommand } from './app-health-delete-authorization-interface-by-id.command';
import { AppHealthDeleteAuthorizationInterfaceByIdService } from './app-health-delete-authorization-interface-by-id.service';

describe('AppHealthDeleteAuthorizationInterfaceByIdCommandHandler', () =>
{
    let commandHandler: AppHealthDeleteAuthorizationInterfaceByIdCommandHandler;
    let service: AppHealthDeleteAuthorizationInterfaceByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthDeleteAuthorizationInterfaceByIdCommandHandler,
                {
                    provide : AppHealthDeleteAuthorizationInterfaceByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthDeleteAuthorizationInterfaceByIdCommandHandler>(AppHealthDeleteAuthorizationInterfaceByIdCommandHandler);
        service = module.get<AppHealthDeleteAuthorizationInterfaceByIdService>(AppHealthDeleteAuthorizationInterfaceByIdService);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteAuthorizationInterfaceByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the AppHealthDeleteAuthorizationInterfaceByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthDeleteAuthorizationInterfaceByIdCommand(
                    appHealthMockAuthorizationInterfaceData[0].id,
                ),
            )).toBe(undefined);
        });
    });
});
