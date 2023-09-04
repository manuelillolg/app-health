import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockAuthenticationInterfaceData } from '@app/app-health/authentication-interface/infrastructure/mock/app-health-mock-authentication-interface.data';
import { AppHealthUpdateAuthenticationInterfacesCommandHandler } from './app-health-update-authentication-interfaces.command-handler';
import { AppHealthUpdateAuthenticationInterfacesCommand } from './app-health-update-authentication-interfaces.command';
import { AppHealthUpdateAuthenticationInterfacesService } from './app-health-update-authentication-interfaces.service';

describe('AppHealthUpdateAuthenticationInterfacesCommandHandler', () =>
{
    let commandHandler: AppHealthUpdateAuthenticationInterfacesCommandHandler;
    let service: AppHealthUpdateAuthenticationInterfacesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthUpdateAuthenticationInterfacesCommandHandler,
                {
                    provide : AppHealthUpdateAuthenticationInterfacesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthUpdateAuthenticationInterfacesCommandHandler>(AppHealthUpdateAuthenticationInterfacesCommandHandler);
        service = module.get<AppHealthUpdateAuthenticationInterfacesService>(AppHealthUpdateAuthenticationInterfacesService);
    });

    describe('main', () =>
    {
        test('UpdateAuthenticationInterfacesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an authenticationInterfaces updated', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthUpdateAuthenticationInterfacesCommand(
                    {
                        id: appHealthMockAuthenticationInterfaceData[0].id,
                        name: appHealthMockAuthenticationInterfaceData[0].name,
                        score: appHealthMockAuthenticationInterfaceData[0].score,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
