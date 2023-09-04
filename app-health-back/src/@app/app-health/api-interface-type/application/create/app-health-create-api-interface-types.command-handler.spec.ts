/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockApiInterfaceTypeData } from '@app/app-health/api-interface-type/infrastructure/mock/app-health-mock-api-interface-type.data';
import { AppHealthCreateApiInterfaceTypesCommandHandler } from './app-health-create-api-interface-types.command-handler';
import { AppHealthCreateApiInterfaceTypesCommand } from './app-health-create-api-interface-types.command';
import { AppHealthCreateApiInterfaceTypesService } from './app-health-create-api-interface-types.service';

describe('appHealthCreateApiInterfaceTypesCommandHandler', () =>
{
    let commandHandler: AppHealthCreateApiInterfaceTypesCommandHandler;
    let service: AppHealthCreateApiInterfaceTypesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateApiInterfaceTypesCommandHandler,
                {
                    provide : AppHealthCreateApiInterfaceTypesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthCreateApiInterfaceTypesCommandHandler>(AppHealthCreateApiInterfaceTypesCommandHandler);
        service = module.get<AppHealthCreateApiInterfaceTypesService>(AppHealthCreateApiInterfaceTypesService);
    });

    describe('main', () =>
    {
        test('AppHealthCreateApiInterfaceTypesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return AppHealthMockApiInterfaceTypeData createds', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthCreateApiInterfaceTypesCommand(
                    appHealthMockApiInterfaceTypeData,
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
