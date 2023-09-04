import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockAuthorizationInterfaceData } from '@app/app-health/authorization-interface/infrastructure/mock/app-health-mock-authorization-interface.data';
import { AppHealthUpdateAuthorizationInterfacesCommandHandler } from './app-health-update-authorization-interfaces.command-handler';
import { AppHealthUpdateAuthorizationInterfacesCommand } from './app-health-update-authorization-interfaces.command';
import { AppHealthUpdateAuthorizationInterfacesService } from './app-health-update-authorization-interfaces.service';

describe('AppHealthUpdateAuthorizationInterfacesCommandHandler', () =>
{
    let commandHandler: AppHealthUpdateAuthorizationInterfacesCommandHandler;
    let service: AppHealthUpdateAuthorizationInterfacesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthUpdateAuthorizationInterfacesCommandHandler,
                {
                    provide : AppHealthUpdateAuthorizationInterfacesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthUpdateAuthorizationInterfacesCommandHandler>(AppHealthUpdateAuthorizationInterfacesCommandHandler);
        service = module.get<AppHealthUpdateAuthorizationInterfacesService>(AppHealthUpdateAuthorizationInterfacesService);
    });

    describe('main', () =>
    {
        test('UpdateAuthorizationInterfacesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an authorizationInterfaces updated', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthUpdateAuthorizationInterfacesCommand(
                    {
                        id: appHealthMockAuthorizationInterfaceData[0].id,
                        name: appHealthMockAuthorizationInterfaceData[0].name,
                        score: appHealthMockAuthorizationInterfaceData[0].score,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
