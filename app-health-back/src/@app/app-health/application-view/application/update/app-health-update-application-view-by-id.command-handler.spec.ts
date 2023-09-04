import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockApplicationViewData } from '@app/app-health/application-view/infrastructure/mock/app-health-mock-application-view.data';
import { AppHealthUpdateApplicationViewByIdCommandHandler } from './app-health-update-application-view-by-id.command-handler';
import { AppHealthUpdateApplicationViewByIdCommand } from './app-health-update-application-view-by-id.command';
import { AppHealthUpdateApplicationViewByIdService } from './app-health-update-application-view-by-id.service';

describe('AppHealthUpdateApplicationViewByIdCommandHandler', () =>
{
    let commandHandler: AppHealthUpdateApplicationViewByIdCommandHandler;
    let service: AppHealthUpdateApplicationViewByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthUpdateApplicationViewByIdCommandHandler,
                {
                    provide : AppHealthUpdateApplicationViewByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthUpdateApplicationViewByIdCommandHandler>(AppHealthUpdateApplicationViewByIdCommandHandler);
        service = module.get<AppHealthUpdateApplicationViewByIdService>(AppHealthUpdateApplicationViewByIdService);
    });

    describe('main', () =>
    {
        test('UpdateApplicationViewByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an applicationView created', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthUpdateApplicationViewByIdCommand(
                    {
                        id: appHealthMockApplicationViewData[0].id,
                        applicationId: appHealthMockApplicationViewData[0].applicationId,
                        totalViews: appHealthMockApplicationViewData[0].totalViews,
                        complexity: appHealthMockApplicationViewData[0].complexity,
                        description: appHealthMockApplicationViewData[0].description,
                        score: appHealthMockApplicationViewData[0].score,
                    },
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
