import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthDeleteApplicationViewsCommandHandler } from './app-health-delete-application-views.command-handler';
import { AppHealthDeleteApplicationViewsCommand } from './app-health-delete-application-views.command';
import { AppHealthDeleteApplicationViewsService } from './app-health-delete-application-views.service';

describe('AppHealthDeleteApplicationViewsCommandHandler', () =>
{
    let commandHandler: AppHealthDeleteApplicationViewsCommandHandler;
    let service: AppHealthDeleteApplicationViewsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthDeleteApplicationViewsCommandHandler,
                {
                    provide : AppHealthDeleteApplicationViewsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthDeleteApplicationViewsCommandHandler>(AppHealthDeleteApplicationViewsCommandHandler);
        service = module.get<AppHealthDeleteApplicationViewsService>(AppHealthDeleteApplicationViewsService);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteApplicationViewsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthDeleteApplicationViewsCommand(),
            )).toBe(undefined);
        });
    });
});
