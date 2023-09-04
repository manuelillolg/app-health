import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockAuthenticationInterfaceData } from '@app/app-health/authentication-interface/infrastructure/mock/app-health-mock-authentication-interface.data';
import { AppHealthUpdateAuthenticationInterfaceByIdCommandHandler } from './app-health-update-authentication-interface-by-id.command-handler';
import { AppHealthUpdateAuthenticationInterfaceByIdCommand } from './app-health-update-authentication-interface-by-id.command';
import { AppHealthUpdateAuthenticationInterfaceByIdService } from './app-health-update-authentication-interface-by-id.service';

describe('AppHealthUpdateAuthenticationInterfaceByIdCommandHandler', () =>
{
    let commandHandler: AppHealthUpdateAuthenticationInterfaceByIdCommandHandler;
    let service: AppHealthUpdateAuthenticationInterfaceByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthUpdateAuthenticationInterfaceByIdCommandHandler,
                {
                    provide : AppHealthUpdateAuthenticationInterfaceByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthUpdateAuthenticationInterfaceByIdCommandHandler>(AppHealthUpdateAuthenticationInterfaceByIdCommandHandler);
        service = module.get<AppHealthUpdateAuthenticationInterfaceByIdService>(AppHealthUpdateAuthenticationInterfaceByIdService);
    });

    describe('main', () =>
    {
        test('UpdateAuthenticationInterfaceByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an authenticationInterface created', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthUpdateAuthenticationInterfaceByIdCommand(
                    {
                        id: appHealthMockAuthenticationInterfaceData[0].id,
                        name: appHealthMockAuthenticationInterfaceData[0].name,
                        score: appHealthMockAuthenticationInterfaceData[0].score,
                    },
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
