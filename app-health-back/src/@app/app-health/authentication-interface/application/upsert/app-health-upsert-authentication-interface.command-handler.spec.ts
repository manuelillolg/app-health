import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockAuthenticationInterfaceData } from '@app/app-health/authentication-interface/infrastructure/mock/app-health-mock-authentication-interface.data';
import { AppHealthUpsertAuthenticationInterfaceCommandHandler } from './app-health-upsert-authentication-interface.command-handler';
import { AppHealthUpsertAuthenticationInterfaceCommand } from './app-health-upsert-authentication-interface.command';
import { AppHealthUpsertAuthenticationInterfaceService } from './app-health-upsert-authentication-interface.service';

describe('AppHealthUpsertAuthenticationInterfaceCommandHandler', () =>
{
    let commandHandler: AppHealthUpsertAuthenticationInterfaceCommandHandler;
    let service: AppHealthUpsertAuthenticationInterfaceService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthUpsertAuthenticationInterfaceCommandHandler,
                {
                    provide : AppHealthUpsertAuthenticationInterfaceService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthUpsertAuthenticationInterfaceCommandHandler>(AppHealthUpsertAuthenticationInterfaceCommandHandler);
        service = module.get<AppHealthUpsertAuthenticationInterfaceService>(AppHealthUpsertAuthenticationInterfaceService);
    });

    describe('main', () =>
    {
        test('UpsertAuthenticationInterfaceCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the AppHealthUpsertAuthenticationInterfaceService', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthUpsertAuthenticationInterfaceCommand(
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
