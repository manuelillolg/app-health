import { AppHealthCreateAuthenticationInterfaceCommandHandler } from './app-health-create-authentication-interface.command-handler';
import { AppHealthCreateAuthenticationInterfaceService } from './app-health-create-authentication-interface.service';
import { AppHealthCreateAuthenticationInterfaceCommand, appHealthMockAuthenticationInterfaceData } from '@app/app-health/authentication-interface';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateAuthenticationInterfaceCommandHandler', () =>
{
    let commandHandler: AppHealthCreateAuthenticationInterfaceCommandHandler;
    let service: AppHealthCreateAuthenticationInterfaceService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateAuthenticationInterfaceCommandHandler,
                {
                    provide : AppHealthCreateAuthenticationInterfaceService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthCreateAuthenticationInterfaceCommandHandler>(AppHealthCreateAuthenticationInterfaceCommandHandler);
        service = module.get<AppHealthCreateAuthenticationInterfaceService>(AppHealthCreateAuthenticationInterfaceService);
    });

    describe('main', () =>
    {
        test('CreateAuthenticationInterfaceCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the AppHealthCreateAuthenticationInterfaceService', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthCreateAuthenticationInterfaceCommand(
                    {
                        id: appHealthMockAuthenticationInterfaceData[0].id,
                        name: appHealthMockAuthenticationInterfaceData[0].name,
                        score: appHealthMockAuthenticationInterfaceData[0].score,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
