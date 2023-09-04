import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockAuthorizationInterfaceData } from '@app/app-health/authorization-interface/infrastructure/mock/app-health-mock-authorization-interface.data';
import { AppHealthUpsertAuthorizationInterfaceCommandHandler } from './app-health-upsert-authorization-interface.command-handler';
import { AppHealthUpsertAuthorizationInterfaceCommand } from './app-health-upsert-authorization-interface.command';
import { AppHealthUpsertAuthorizationInterfaceService } from './app-health-upsert-authorization-interface.service';

describe('AppHealthUpsertAuthorizationInterfaceCommandHandler', () =>
{
    let commandHandler: AppHealthUpsertAuthorizationInterfaceCommandHandler;
    let service: AppHealthUpsertAuthorizationInterfaceService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthUpsertAuthorizationInterfaceCommandHandler,
                {
                    provide : AppHealthUpsertAuthorizationInterfaceService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthUpsertAuthorizationInterfaceCommandHandler>(AppHealthUpsertAuthorizationInterfaceCommandHandler);
        service = module.get<AppHealthUpsertAuthorizationInterfaceService>(AppHealthUpsertAuthorizationInterfaceService);
    });

    describe('main', () =>
    {
        test('UpsertAuthorizationInterfaceCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the AppHealthUpsertAuthorizationInterfaceService', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthUpsertAuthorizationInterfaceCommand(
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
