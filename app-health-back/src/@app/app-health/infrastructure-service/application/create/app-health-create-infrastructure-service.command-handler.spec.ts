import { AppHealthCreateInfrastructureServiceCommandHandler } from './app-health-create-infrastructure-service.command-handler';
import { AppHealthCreateInfrastructureServiceService } from './app-health-create-infrastructure-service.service';
import { AppHealthCreateInfrastructureServiceCommand, appHealthMockInfrastructureServiceData } from '@app/app-health/infrastructure-service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateInfrastructureServiceCommandHandler', () =>
{
    let commandHandler: AppHealthCreateInfrastructureServiceCommandHandler;
    let service: AppHealthCreateInfrastructureServiceService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateInfrastructureServiceCommandHandler,
                {
                    provide : AppHealthCreateInfrastructureServiceService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthCreateInfrastructureServiceCommandHandler>(AppHealthCreateInfrastructureServiceCommandHandler);
        service = module.get<AppHealthCreateInfrastructureServiceService>(AppHealthCreateInfrastructureServiceService);
    });

    describe('main', () =>
    {
        test('CreateInfrastructureServiceCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the AppHealthCreateInfrastructureServiceService', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthCreateInfrastructureServiceCommand(
                    {
                        id: appHealthMockInfrastructureServiceData[0].id,
                        providerId: appHealthMockInfrastructureServiceData[0].providerId,
                        name: appHealthMockInfrastructureServiceData[0].name,
                        score: appHealthMockInfrastructureServiceData[0].score,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
