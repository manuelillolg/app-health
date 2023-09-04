import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthDeleteApplicationAuthorizationByIdCommandHandler } from './app-health-delete-application-authorization-by-id.command-handler';
import { appHealthMockApplicationAuthorizationData } from '@app/app-health/application-authorization/infrastructure/mock/app-health-mock-application-authorization.data';
import { AppHealthDeleteApplicationAuthorizationByIdCommand } from './app-health-delete-application-authorization-by-id.command';
import { AppHealthDeleteApplicationAuthorizationByIdService } from './app-health-delete-application-authorization-by-id.service';

describe('AppHealthDeleteApplicationAuthorizationByIdCommandHandler', () =>
{
    let commandHandler: AppHealthDeleteApplicationAuthorizationByIdCommandHandler;
    let service: AppHealthDeleteApplicationAuthorizationByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthDeleteApplicationAuthorizationByIdCommandHandler,
                {
                    provide : AppHealthDeleteApplicationAuthorizationByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthDeleteApplicationAuthorizationByIdCommandHandler>(AppHealthDeleteApplicationAuthorizationByIdCommandHandler);
        service = module.get<AppHealthDeleteApplicationAuthorizationByIdService>(AppHealthDeleteApplicationAuthorizationByIdService);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteApplicationAuthorizationByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the AppHealthDeleteApplicationAuthorizationByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthDeleteApplicationAuthorizationByIdCommand(
                    appHealthMockApplicationAuthorizationData[0].id,
                ),
            )).toBe(undefined);
        });
    });
});
