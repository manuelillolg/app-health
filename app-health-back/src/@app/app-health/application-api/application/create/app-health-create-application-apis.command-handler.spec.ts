/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockApplicationApiData } from '@app/app-health/application-api/infrastructure/mock/app-health-mock-application-api.data';
import { AppHealthCreateApplicationApisCommandHandler } from './app-health-create-application-apis.command-handler';
import { AppHealthCreateApplicationApisCommand } from './app-health-create-application-apis.command';
import { AppHealthCreateApplicationApisService } from './app-health-create-application-apis.service';

describe('appHealthCreateApplicationApisCommandHandler', () =>
{
    let commandHandler: AppHealthCreateApplicationApisCommandHandler;
    let service: AppHealthCreateApplicationApisService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateApplicationApisCommandHandler,
                {
                    provide : AppHealthCreateApplicationApisService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthCreateApplicationApisCommandHandler>(AppHealthCreateApplicationApisCommandHandler);
        service = module.get<AppHealthCreateApplicationApisService>(AppHealthCreateApplicationApisService);
    });

    describe('main', () =>
    {
        test('AppHealthCreateApplicationApisCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return AppHealthMockApplicationApiData createds', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthCreateApplicationApisCommand(
                    appHealthMockApplicationApiData,
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
