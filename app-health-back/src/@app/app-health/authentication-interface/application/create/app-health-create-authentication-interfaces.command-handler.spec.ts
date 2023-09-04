/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockAuthenticationInterfaceData } from '@app/app-health/authentication-interface/infrastructure/mock/app-health-mock-authentication-interface.data';
import { AppHealthCreateAuthenticationInterfacesCommandHandler } from './app-health-create-authentication-interfaces.command-handler';
import { AppHealthCreateAuthenticationInterfacesCommand } from './app-health-create-authentication-interfaces.command';
import { AppHealthCreateAuthenticationInterfacesService } from './app-health-create-authentication-interfaces.service';

describe('appHealthCreateAuthenticationInterfacesCommandHandler', () =>
{
    let commandHandler: AppHealthCreateAuthenticationInterfacesCommandHandler;
    let service: AppHealthCreateAuthenticationInterfacesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateAuthenticationInterfacesCommandHandler,
                {
                    provide : AppHealthCreateAuthenticationInterfacesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthCreateAuthenticationInterfacesCommandHandler>(AppHealthCreateAuthenticationInterfacesCommandHandler);
        service = module.get<AppHealthCreateAuthenticationInterfacesService>(AppHealthCreateAuthenticationInterfacesService);
    });

    describe('main', () =>
    {
        test('AppHealthCreateAuthenticationInterfacesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return AppHealthMockAuthenticationInterfaceData createds', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthCreateAuthenticationInterfacesCommand(
                    appHealthMockAuthenticationInterfaceData,
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
