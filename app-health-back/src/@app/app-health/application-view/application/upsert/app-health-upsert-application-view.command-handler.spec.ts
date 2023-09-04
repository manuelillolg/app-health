import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockApplicationViewData } from '@app/app-health/application-view/infrastructure/mock/app-health-mock-application-view.data';
import { AppHealthUpsertApplicationViewCommandHandler } from './app-health-upsert-application-view.command-handler';
import { AppHealthUpsertApplicationViewCommand } from './app-health-upsert-application-view.command';
import { AppHealthUpsertApplicationViewService } from './app-health-upsert-application-view.service';

describe('AppHealthUpsertApplicationViewCommandHandler', () =>
{
    let commandHandler: AppHealthUpsertApplicationViewCommandHandler;
    let service: AppHealthUpsertApplicationViewService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthUpsertApplicationViewCommandHandler,
                {
                    provide : AppHealthUpsertApplicationViewService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthUpsertApplicationViewCommandHandler>(AppHealthUpsertApplicationViewCommandHandler);
        service = module.get<AppHealthUpsertApplicationViewService>(AppHealthUpsertApplicationViewService);
    });

    describe('main', () =>
    {
        test('UpsertApplicationViewCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the AppHealthUpsertApplicationViewService', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthUpsertApplicationViewCommand(
                    {
                        id: appHealthMockApplicationViewData[0].id,
                        applicationId: appHealthMockApplicationViewData[0].applicationId,
                        totalViews: appHealthMockApplicationViewData[0].totalViews,
                        complexity: appHealthMockApplicationViewData[0].complexity,
                        description: appHealthMockApplicationViewData[0].description,
                        score: appHealthMockApplicationViewData[0].score,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
