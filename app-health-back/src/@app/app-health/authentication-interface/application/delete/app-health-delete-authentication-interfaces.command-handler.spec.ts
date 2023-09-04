import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthDeleteAuthenticationInterfacesCommandHandler } from './app-health-delete-authentication-interfaces.command-handler';
import { AppHealthDeleteAuthenticationInterfacesCommand } from './app-health-delete-authentication-interfaces.command';
import { AppHealthDeleteAuthenticationInterfacesService } from './app-health-delete-authentication-interfaces.service';

describe('AppHealthDeleteAuthenticationInterfacesCommandHandler', () =>
{
    let commandHandler: AppHealthDeleteAuthenticationInterfacesCommandHandler;
    let service: AppHealthDeleteAuthenticationInterfacesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthDeleteAuthenticationInterfacesCommandHandler,
                {
                    provide : AppHealthDeleteAuthenticationInterfacesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthDeleteAuthenticationInterfacesCommandHandler>(AppHealthDeleteAuthenticationInterfacesCommandHandler);
        service = module.get<AppHealthDeleteAuthenticationInterfacesService>(AppHealthDeleteAuthenticationInterfacesService);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteAuthenticationInterfacesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthDeleteAuthenticationInterfacesCommand(),
            )).toBe(undefined);
        });
    });
});
