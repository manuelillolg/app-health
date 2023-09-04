/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockApplicationData } from '@app/app-health/application/infrastructure/mock/app-health-mock-application.data';
import { AppHealthCreateApplicationsCommandHandler } from './app-health-create-applications.command-handler';
import { AppHealthCreateApplicationsCommand } from './app-health-create-applications.command';
import { AppHealthCreateApplicationsService } from './app-health-create-applications.service';

describe('appHealthCreateApplicationsCommandHandler', () =>
{
    let commandHandler: AppHealthCreateApplicationsCommandHandler;
    let service: AppHealthCreateApplicationsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateApplicationsCommandHandler,
                {
                    provide : AppHealthCreateApplicationsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthCreateApplicationsCommandHandler>(AppHealthCreateApplicationsCommandHandler);
        service = module.get<AppHealthCreateApplicationsService>(AppHealthCreateApplicationsService);
    });

    describe('main', () =>
    {
        test('AppHealthCreateApplicationsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return AppHealthMockApplicationData createds', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthCreateApplicationsCommand(
                    appHealthMockApplicationData,
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
