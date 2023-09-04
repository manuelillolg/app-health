import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthDeleteApplicationViewByIdCommandHandler } from './app-health-delete-application-view-by-id.command-handler';
import { appHealthMockApplicationViewData } from '@app/app-health/application-view/infrastructure/mock/app-health-mock-application-view.data';
import { AppHealthDeleteApplicationViewByIdCommand } from './app-health-delete-application-view-by-id.command';
import { AppHealthDeleteApplicationViewByIdService } from './app-health-delete-application-view-by-id.service';

describe('AppHealthDeleteApplicationViewByIdCommandHandler', () =>
{
    let commandHandler: AppHealthDeleteApplicationViewByIdCommandHandler;
    let service: AppHealthDeleteApplicationViewByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthDeleteApplicationViewByIdCommandHandler,
                {
                    provide : AppHealthDeleteApplicationViewByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthDeleteApplicationViewByIdCommandHandler>(AppHealthDeleteApplicationViewByIdCommandHandler);
        service = module.get<AppHealthDeleteApplicationViewByIdService>(AppHealthDeleteApplicationViewByIdService);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteApplicationViewByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the AppHealthDeleteApplicationViewByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthDeleteApplicationViewByIdCommand(
                    appHealthMockApplicationViewData[0].id,
                ),
            )).toBe(undefined);
        });
    });
});
