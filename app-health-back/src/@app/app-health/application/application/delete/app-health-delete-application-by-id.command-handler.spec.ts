import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthDeleteApplicationByIdCommandHandler } from './app-health-delete-application-by-id.command-handler';
import { appHealthMockApplicationData } from '@app/app-health/application/infrastructure/mock/app-health-mock-application.data';
import { AppHealthDeleteApplicationByIdCommand } from './app-health-delete-application-by-id.command';
import { AppHealthDeleteApplicationByIdService } from './app-health-delete-application-by-id.service';

describe('AppHealthDeleteApplicationByIdCommandHandler', () =>
{
    let commandHandler: AppHealthDeleteApplicationByIdCommandHandler;
    let service: AppHealthDeleteApplicationByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthDeleteApplicationByIdCommandHandler,
                {
                    provide : AppHealthDeleteApplicationByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthDeleteApplicationByIdCommandHandler>(AppHealthDeleteApplicationByIdCommandHandler);
        service = module.get<AppHealthDeleteApplicationByIdService>(AppHealthDeleteApplicationByIdService);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteApplicationByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the AppHealthDeleteApplicationByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthDeleteApplicationByIdCommand(
                    appHealthMockApplicationData[0].id,
                ),
            )).toBe(undefined);
        });
    });
});
