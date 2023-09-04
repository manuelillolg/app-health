import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthDeleteApplicationApiByIdCommandHandler } from './app-health-delete-application-api-by-id.command-handler';
import { appHealthMockApplicationApiData } from '@app/app-health/application-api/infrastructure/mock/app-health-mock-application-api.data';
import { AppHealthDeleteApplicationApiByIdCommand } from './app-health-delete-application-api-by-id.command';
import { AppHealthDeleteApplicationApiByIdService } from './app-health-delete-application-api-by-id.service';

describe('AppHealthDeleteApplicationApiByIdCommandHandler', () =>
{
    let commandHandler: AppHealthDeleteApplicationApiByIdCommandHandler;
    let service: AppHealthDeleteApplicationApiByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthDeleteApplicationApiByIdCommandHandler,
                {
                    provide : AppHealthDeleteApplicationApiByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthDeleteApplicationApiByIdCommandHandler>(AppHealthDeleteApplicationApiByIdCommandHandler);
        service = module.get<AppHealthDeleteApplicationApiByIdService>(AppHealthDeleteApplicationApiByIdService);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteApplicationApiByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the AppHealthDeleteApplicationApiByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthDeleteApplicationApiByIdCommand(
                    appHealthMockApplicationApiData[0].id,
                ),
            )).toBe(undefined);
        });
    });
});
