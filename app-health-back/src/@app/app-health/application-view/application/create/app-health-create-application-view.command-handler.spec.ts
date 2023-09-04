import { AppHealthCreateApplicationViewCommandHandler } from './app-health-create-application-view.command-handler';
import { AppHealthCreateApplicationViewService } from './app-health-create-application-view.service';
import { AppHealthCreateApplicationViewCommand, appHealthMockApplicationViewData } from '@app/app-health/application-view';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateApplicationViewCommandHandler', () =>
{
    let commandHandler: AppHealthCreateApplicationViewCommandHandler;
    let service: AppHealthCreateApplicationViewService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateApplicationViewCommandHandler,
                {
                    provide : AppHealthCreateApplicationViewService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthCreateApplicationViewCommandHandler>(AppHealthCreateApplicationViewCommandHandler);
        service = module.get<AppHealthCreateApplicationViewService>(AppHealthCreateApplicationViewService);
    });

    describe('main', () =>
    {
        test('CreateApplicationViewCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the AppHealthCreateApplicationViewService', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthCreateApplicationViewCommand(
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
