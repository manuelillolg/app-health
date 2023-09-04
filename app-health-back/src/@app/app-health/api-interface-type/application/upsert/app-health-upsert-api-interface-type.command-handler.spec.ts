import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockApiInterfaceTypeData } from '@app/app-health/api-interface-type/infrastructure/mock/app-health-mock-api-interface-type.data';
import { AppHealthUpsertApiInterfaceTypeCommandHandler } from './app-health-upsert-api-interface-type.command-handler';
import { AppHealthUpsertApiInterfaceTypeCommand } from './app-health-upsert-api-interface-type.command';
import { AppHealthUpsertApiInterfaceTypeService } from './app-health-upsert-api-interface-type.service';

describe('AppHealthUpsertApiInterfaceTypeCommandHandler', () =>
{
    let commandHandler: AppHealthUpsertApiInterfaceTypeCommandHandler;
    let service: AppHealthUpsertApiInterfaceTypeService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthUpsertApiInterfaceTypeCommandHandler,
                {
                    provide : AppHealthUpsertApiInterfaceTypeService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthUpsertApiInterfaceTypeCommandHandler>(AppHealthUpsertApiInterfaceTypeCommandHandler);
        service = module.get<AppHealthUpsertApiInterfaceTypeService>(AppHealthUpsertApiInterfaceTypeService);
    });

    describe('main', () =>
    {
        test('UpsertApiInterfaceTypeCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the AppHealthUpsertApiInterfaceTypeService', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthUpsertApiInterfaceTypeCommand(
                    {
                        id: appHealthMockApiInterfaceTypeData[0].id,
                        name: appHealthMockApiInterfaceTypeData[0].name,
                        score: appHealthMockApiInterfaceTypeData[0].score,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
