import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthDeleteInfrastructureServiceByIdCommandHandler } from './app-health-delete-infrastructure-service-by-id.command-handler';
import { appHealthMockInfrastructureServiceData } from '@app/app-health/infrastructure-service/infrastructure/mock/app-health-mock-infrastructure-service.data';
import { AppHealthDeleteInfrastructureServiceByIdCommand } from './app-health-delete-infrastructure-service-by-id.command';
import { AppHealthDeleteInfrastructureServiceByIdService } from './app-health-delete-infrastructure-service-by-id.service';

describe('AppHealthDeleteInfrastructureServiceByIdCommandHandler', () =>
{
    let commandHandler: AppHealthDeleteInfrastructureServiceByIdCommandHandler;
    let service: AppHealthDeleteInfrastructureServiceByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthDeleteInfrastructureServiceByIdCommandHandler,
                {
                    provide : AppHealthDeleteInfrastructureServiceByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthDeleteInfrastructureServiceByIdCommandHandler>(AppHealthDeleteInfrastructureServiceByIdCommandHandler);
        service = module.get<AppHealthDeleteInfrastructureServiceByIdService>(AppHealthDeleteInfrastructureServiceByIdService);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteInfrastructureServiceByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the AppHealthDeleteInfrastructureServiceByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthDeleteInfrastructureServiceByIdCommand(
                    appHealthMockInfrastructureServiceData[0].id,
                ),
            )).toBe(undefined);
        });
    });
});
