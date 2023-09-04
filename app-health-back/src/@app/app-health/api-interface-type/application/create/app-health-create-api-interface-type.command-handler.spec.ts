import { AppHealthCreateApiInterfaceTypeCommandHandler } from './app-health-create-api-interface-type.command-handler';
import { AppHealthCreateApiInterfaceTypeService } from './app-health-create-api-interface-type.service';
import { AppHealthCreateApiInterfaceTypeCommand, appHealthMockApiInterfaceTypeData } from '@app/app-health/api-interface-type';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateApiInterfaceTypeCommandHandler', () =>
{
    let commandHandler: AppHealthCreateApiInterfaceTypeCommandHandler;
    let service: AppHealthCreateApiInterfaceTypeService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateApiInterfaceTypeCommandHandler,
                {
                    provide : AppHealthCreateApiInterfaceTypeService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthCreateApiInterfaceTypeCommandHandler>(AppHealthCreateApiInterfaceTypeCommandHandler);
        service = module.get<AppHealthCreateApiInterfaceTypeService>(AppHealthCreateApiInterfaceTypeService);
    });

    describe('main', () =>
    {
        test('CreateApiInterfaceTypeCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the AppHealthCreateApiInterfaceTypeService', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthCreateApiInterfaceTypeCommand(
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
