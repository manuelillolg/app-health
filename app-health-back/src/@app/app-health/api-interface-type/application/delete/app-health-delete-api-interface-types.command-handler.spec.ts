import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthDeleteApiInterfaceTypesCommandHandler } from './app-health-delete-api-interface-types.command-handler';
import { AppHealthDeleteApiInterfaceTypesCommand } from './app-health-delete-api-interface-types.command';
import { AppHealthDeleteApiInterfaceTypesService } from './app-health-delete-api-interface-types.service';

describe('AppHealthDeleteApiInterfaceTypesCommandHandler', () =>
{
    let commandHandler: AppHealthDeleteApiInterfaceTypesCommandHandler;
    let service: AppHealthDeleteApiInterfaceTypesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthDeleteApiInterfaceTypesCommandHandler,
                {
                    provide : AppHealthDeleteApiInterfaceTypesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthDeleteApiInterfaceTypesCommandHandler>(AppHealthDeleteApiInterfaceTypesCommandHandler);
        service = module.get<AppHealthDeleteApiInterfaceTypesService>(AppHealthDeleteApiInterfaceTypesService);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteApiInterfaceTypesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthDeleteApiInterfaceTypesCommand(),
            )).toBe(undefined);
        });
    });
});
