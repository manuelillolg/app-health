import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthDeleteApiInterfaceTypeByIdCommandHandler } from './app-health-delete-api-interface-type-by-id.command-handler';
import { appHealthMockApiInterfaceTypeData } from '@app/app-health/api-interface-type/infrastructure/mock/app-health-mock-api-interface-type.data';
import { AppHealthDeleteApiInterfaceTypeByIdCommand } from './app-health-delete-api-interface-type-by-id.command';
import { AppHealthDeleteApiInterfaceTypeByIdService } from './app-health-delete-api-interface-type-by-id.service';

describe('AppHealthDeleteApiInterfaceTypeByIdCommandHandler', () =>
{
    let commandHandler: AppHealthDeleteApiInterfaceTypeByIdCommandHandler;
    let service: AppHealthDeleteApiInterfaceTypeByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthDeleteApiInterfaceTypeByIdCommandHandler,
                {
                    provide : AppHealthDeleteApiInterfaceTypeByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthDeleteApiInterfaceTypeByIdCommandHandler>(AppHealthDeleteApiInterfaceTypeByIdCommandHandler);
        service = module.get<AppHealthDeleteApiInterfaceTypeByIdService>(AppHealthDeleteApiInterfaceTypeByIdService);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteApiInterfaceTypeByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the AppHealthDeleteApiInterfaceTypeByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthDeleteApiInterfaceTypeByIdCommand(
                    appHealthMockApiInterfaceTypeData[0].id,
                ),
            )).toBe(undefined);
        });
    });
});
