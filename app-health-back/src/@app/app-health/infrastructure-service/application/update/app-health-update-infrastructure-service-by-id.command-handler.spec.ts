import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockInfrastructureServiceData } from '@app/app-health/infrastructure-service/infrastructure/mock/app-health-mock-infrastructure-service.data';
import { AppHealthUpdateInfrastructureServiceByIdCommandHandler } from './app-health-update-infrastructure-service-by-id.command-handler';
import { AppHealthUpdateInfrastructureServiceByIdCommand } from './app-health-update-infrastructure-service-by-id.command';
import { AppHealthUpdateInfrastructureServiceByIdService } from './app-health-update-infrastructure-service-by-id.service';

describe('AppHealthUpdateInfrastructureServiceByIdCommandHandler', () =>
{
    let commandHandler: AppHealthUpdateInfrastructureServiceByIdCommandHandler;
    let service: AppHealthUpdateInfrastructureServiceByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthUpdateInfrastructureServiceByIdCommandHandler,
                {
                    provide : AppHealthUpdateInfrastructureServiceByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthUpdateInfrastructureServiceByIdCommandHandler>(AppHealthUpdateInfrastructureServiceByIdCommandHandler);
        service = module.get<AppHealthUpdateInfrastructureServiceByIdService>(AppHealthUpdateInfrastructureServiceByIdService);
    });

    describe('main', () =>
    {
        test('UpdateInfrastructureServiceByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an infrastructureService created', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthUpdateInfrastructureServiceByIdCommand(
                    {
                        id: appHealthMockInfrastructureServiceData[0].id,
                        providerId: appHealthMockInfrastructureServiceData[0].providerId,
                        name: appHealthMockInfrastructureServiceData[0].name,
                        score: appHealthMockInfrastructureServiceData[0].score,
                    },
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
