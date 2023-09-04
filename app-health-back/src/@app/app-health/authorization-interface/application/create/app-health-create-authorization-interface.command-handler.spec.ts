import { AppHealthCreateAuthorizationInterfaceCommandHandler } from './app-health-create-authorization-interface.command-handler';
import { AppHealthCreateAuthorizationInterfaceService } from './app-health-create-authorization-interface.service';
import { AppHealthCreateAuthorizationInterfaceCommand, appHealthMockAuthorizationInterfaceData } from '@app/app-health/authorization-interface';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateAuthorizationInterfaceCommandHandler', () =>
{
    let commandHandler: AppHealthCreateAuthorizationInterfaceCommandHandler;
    let service: AppHealthCreateAuthorizationInterfaceService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateAuthorizationInterfaceCommandHandler,
                {
                    provide : AppHealthCreateAuthorizationInterfaceService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthCreateAuthorizationInterfaceCommandHandler>(AppHealthCreateAuthorizationInterfaceCommandHandler);
        service = module.get<AppHealthCreateAuthorizationInterfaceService>(AppHealthCreateAuthorizationInterfaceService);
    });

    describe('main', () =>
    {
        test('CreateAuthorizationInterfaceCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the AppHealthCreateAuthorizationInterfaceService', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthCreateAuthorizationInterfaceCommand(
                    {
                        id: appHealthMockAuthorizationInterfaceData[0].id,
                        name: appHealthMockAuthorizationInterfaceData[0].name,
                        score: appHealthMockAuthorizationInterfaceData[0].score,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
