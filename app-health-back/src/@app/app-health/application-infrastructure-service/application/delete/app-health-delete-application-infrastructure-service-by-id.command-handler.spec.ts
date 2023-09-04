import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthDeleteApplicationInfrastructureServiceByIdCommandHandler } from './app-health-delete-application-infrastructure-service-by-id.command-handler';
import { appHealthMockApplicationInfrastructureServiceData } from '@app/app-health/application-infrastructure-service/infrastructure/mock/app-health-mock-application-infrastructure-service.data';
import { AppHealthDeleteApplicationInfrastructureServiceByIdCommand } from './app-health-delete-application-infrastructure-service-by-id.command';
import { AppHealthDeleteApplicationInfrastructureServiceByIdService } from './app-health-delete-application-infrastructure-service-by-id.service';

describe('AppHealthDeleteApplicationInfrastructureServiceByIdCommandHandler', () =>
{
    let commandHandler: AppHealthDeleteApplicationInfrastructureServiceByIdCommandHandler;
    let service: AppHealthDeleteApplicationInfrastructureServiceByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthDeleteApplicationInfrastructureServiceByIdCommandHandler,
                {
                    provide : AppHealthDeleteApplicationInfrastructureServiceByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthDeleteApplicationInfrastructureServiceByIdCommandHandler>(AppHealthDeleteApplicationInfrastructureServiceByIdCommandHandler);
        service = module.get<AppHealthDeleteApplicationInfrastructureServiceByIdService>(AppHealthDeleteApplicationInfrastructureServiceByIdService);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteApplicationInfrastructureServiceByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the AppHealthDeleteApplicationInfrastructureServiceByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthDeleteApplicationInfrastructureServiceByIdCommand(
                    appHealthMockApplicationInfrastructureServiceData[0].id,
                ),
            )).toBe(undefined);
        });
    });
});
