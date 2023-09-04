/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockAuthorizationInterfaceData } from '@app/app-health/authorization-interface/infrastructure/mock/app-health-mock-authorization-interface.data';
import { AppHealthCreateAuthorizationInterfacesCommandHandler } from './app-health-create-authorization-interfaces.command-handler';
import { AppHealthCreateAuthorizationInterfacesCommand } from './app-health-create-authorization-interfaces.command';
import { AppHealthCreateAuthorizationInterfacesService } from './app-health-create-authorization-interfaces.service';

describe('appHealthCreateAuthorizationInterfacesCommandHandler', () =>
{
    let commandHandler: AppHealthCreateAuthorizationInterfacesCommandHandler;
    let service: AppHealthCreateAuthorizationInterfacesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateAuthorizationInterfacesCommandHandler,
                {
                    provide : AppHealthCreateAuthorizationInterfacesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthCreateAuthorizationInterfacesCommandHandler>(AppHealthCreateAuthorizationInterfacesCommandHandler);
        service = module.get<AppHealthCreateAuthorizationInterfacesService>(AppHealthCreateAuthorizationInterfacesService);
    });

    describe('main', () =>
    {
        test('AppHealthCreateAuthorizationInterfacesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return AppHealthMockAuthorizationInterfaceData createds', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthCreateAuthorizationInterfacesCommand(
                    appHealthMockAuthorizationInterfaceData,
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
