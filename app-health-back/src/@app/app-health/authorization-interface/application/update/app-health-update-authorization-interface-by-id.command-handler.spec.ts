import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockAuthorizationInterfaceData } from '@app/app-health/authorization-interface/infrastructure/mock/app-health-mock-authorization-interface.data';
import { AppHealthUpdateAuthorizationInterfaceByIdCommandHandler } from './app-health-update-authorization-interface-by-id.command-handler';
import { AppHealthUpdateAuthorizationInterfaceByIdCommand } from './app-health-update-authorization-interface-by-id.command';
import { AppHealthUpdateAuthorizationInterfaceByIdService } from './app-health-update-authorization-interface-by-id.service';

describe('AppHealthUpdateAuthorizationInterfaceByIdCommandHandler', () =>
{
    let commandHandler: AppHealthUpdateAuthorizationInterfaceByIdCommandHandler;
    let service: AppHealthUpdateAuthorizationInterfaceByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthUpdateAuthorizationInterfaceByIdCommandHandler,
                {
                    provide : AppHealthUpdateAuthorizationInterfaceByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthUpdateAuthorizationInterfaceByIdCommandHandler>(AppHealthUpdateAuthorizationInterfaceByIdCommandHandler);
        service = module.get<AppHealthUpdateAuthorizationInterfaceByIdService>(AppHealthUpdateAuthorizationInterfaceByIdService);
    });

    describe('main', () =>
    {
        test('UpdateAuthorizationInterfaceByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an authorizationInterface created', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthUpdateAuthorizationInterfaceByIdCommand(
                    {
                        id: appHealthMockAuthorizationInterfaceData[0].id,
                        name: appHealthMockAuthorizationInterfaceData[0].name,
                        score: appHealthMockAuthorizationInterfaceData[0].score,
                    },
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
