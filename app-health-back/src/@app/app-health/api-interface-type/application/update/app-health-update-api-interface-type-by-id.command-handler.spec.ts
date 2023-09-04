import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockApiInterfaceTypeData } from '@app/app-health/api-interface-type/infrastructure/mock/app-health-mock-api-interface-type.data';
import { AppHealthUpdateApiInterfaceTypeByIdCommandHandler } from './app-health-update-api-interface-type-by-id.command-handler';
import { AppHealthUpdateApiInterfaceTypeByIdCommand } from './app-health-update-api-interface-type-by-id.command';
import { AppHealthUpdateApiInterfaceTypeByIdService } from './app-health-update-api-interface-type-by-id.service';

describe('AppHealthUpdateApiInterfaceTypeByIdCommandHandler', () =>
{
    let commandHandler: AppHealthUpdateApiInterfaceTypeByIdCommandHandler;
    let service: AppHealthUpdateApiInterfaceTypeByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthUpdateApiInterfaceTypeByIdCommandHandler,
                {
                    provide : AppHealthUpdateApiInterfaceTypeByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthUpdateApiInterfaceTypeByIdCommandHandler>(AppHealthUpdateApiInterfaceTypeByIdCommandHandler);
        service = module.get<AppHealthUpdateApiInterfaceTypeByIdService>(AppHealthUpdateApiInterfaceTypeByIdService);
    });

    describe('main', () =>
    {
        test('UpdateApiInterfaceTypeByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an apiInterfaceType created', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthUpdateApiInterfaceTypeByIdCommand(
                    {
                        id: appHealthMockApiInterfaceTypeData[0].id,
                        name: appHealthMockApiInterfaceTypeData[0].name,
                        score: appHealthMockApiInterfaceTypeData[0].score,
                    },
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
