import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockApplicationViewData } from '@app/app-health/application-view/infrastructure/mock/app-health-mock-application-view.data';
import { AppHealthUpdateApplicationViewsCommandHandler } from './app-health-update-application-views.command-handler';
import { AppHealthUpdateApplicationViewsCommand } from './app-health-update-application-views.command';
import { AppHealthUpdateApplicationViewsService } from './app-health-update-application-views.service';

describe('AppHealthUpdateApplicationViewsCommandHandler', () =>
{
    let commandHandler: AppHealthUpdateApplicationViewsCommandHandler;
    let service: AppHealthUpdateApplicationViewsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthUpdateApplicationViewsCommandHandler,
                {
                    provide : AppHealthUpdateApplicationViewsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthUpdateApplicationViewsCommandHandler>(AppHealthUpdateApplicationViewsCommandHandler);
        service = module.get<AppHealthUpdateApplicationViewsService>(AppHealthUpdateApplicationViewsService);
    });

    describe('main', () =>
    {
        test('UpdateApplicationViewsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an applicationViews updated', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthUpdateApplicationViewsCommand(
                    {
                        id: appHealthMockApplicationViewData[0].id,
                        applicationId: appHealthMockApplicationViewData[0].applicationId,
                        totalViews: appHealthMockApplicationViewData[0].totalViews,
                        complexity: appHealthMockApplicationViewData[0].complexity,
                        description: appHealthMockApplicationViewData[0].description,
                        score: appHealthMockApplicationViewData[0].score,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
