import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthDeleteAuthorizationInterfacesCommandHandler } from './app-health-delete-authorization-interfaces.command-handler';
import { AppHealthDeleteAuthorizationInterfacesCommand } from './app-health-delete-authorization-interfaces.command';
import { AppHealthDeleteAuthorizationInterfacesService } from './app-health-delete-authorization-interfaces.service';

describe('AppHealthDeleteAuthorizationInterfacesCommandHandler', () =>
{
    let commandHandler: AppHealthDeleteAuthorizationInterfacesCommandHandler;
    let service: AppHealthDeleteAuthorizationInterfacesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthDeleteAuthorizationInterfacesCommandHandler,
                {
                    provide : AppHealthDeleteAuthorizationInterfacesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthDeleteAuthorizationInterfacesCommandHandler>(AppHealthDeleteAuthorizationInterfacesCommandHandler);
        service = module.get<AppHealthDeleteAuthorizationInterfacesService>(AppHealthDeleteAuthorizationInterfacesService);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteAuthorizationInterfacesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthDeleteAuthorizationInterfacesCommand(),
            )).toBe(undefined);
        });
    });
});
