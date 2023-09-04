import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockApiInterfaceTypeData } from '@app/app-health/api-interface-type/infrastructure/mock/app-health-mock-api-interface-type.data';
import { AppHealthUpdateApiInterfaceTypesCommandHandler } from './app-health-update-api-interface-types.command-handler';
import { AppHealthUpdateApiInterfaceTypesCommand } from './app-health-update-api-interface-types.command';
import { AppHealthUpdateApiInterfaceTypesService } from './app-health-update-api-interface-types.service';

describe('AppHealthUpdateApiInterfaceTypesCommandHandler', () =>
{
    let commandHandler: AppHealthUpdateApiInterfaceTypesCommandHandler;
    let service: AppHealthUpdateApiInterfaceTypesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthUpdateApiInterfaceTypesCommandHandler,
                {
                    provide : AppHealthUpdateApiInterfaceTypesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthUpdateApiInterfaceTypesCommandHandler>(AppHealthUpdateApiInterfaceTypesCommandHandler);
        service = module.get<AppHealthUpdateApiInterfaceTypesService>(AppHealthUpdateApiInterfaceTypesService);
    });

    describe('main', () =>
    {
        test('UpdateApiInterfaceTypesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an apiInterfaceTypes updated', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthUpdateApiInterfaceTypesCommand(
                    {
                        id: appHealthMockApiInterfaceTypeData[0].id,
                        name: appHealthMockApiInterfaceTypeData[0].name,
                        score: appHealthMockApiInterfaceTypeData[0].score,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
