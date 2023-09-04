/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockApplicationViewData } from '@app/app-health/application-view/infrastructure/mock/app-health-mock-application-view.data';
import { AppHealthCreateApplicationViewsCommandHandler } from './app-health-create-application-views.command-handler';
import { AppHealthCreateApplicationViewsCommand } from './app-health-create-application-views.command';
import { AppHealthCreateApplicationViewsService } from './app-health-create-application-views.service';

describe('appHealthCreateApplicationViewsCommandHandler', () =>
{
    let commandHandler: AppHealthCreateApplicationViewsCommandHandler;
    let service: AppHealthCreateApplicationViewsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateApplicationViewsCommandHandler,
                {
                    provide : AppHealthCreateApplicationViewsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthCreateApplicationViewsCommandHandler>(AppHealthCreateApplicationViewsCommandHandler);
        service = module.get<AppHealthCreateApplicationViewsService>(AppHealthCreateApplicationViewsService);
    });

    describe('main', () =>
    {
        test('AppHealthCreateApplicationViewsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return AppHealthMockApplicationViewData createds', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthCreateApplicationViewsCommand(
                    appHealthMockApplicationViewData,
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
