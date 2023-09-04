/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockInfrastructureServiceData } from '@app/app-health/infrastructure-service/infrastructure/mock/app-health-mock-infrastructure-service.data';
import { AppHealthCreateInfrastructureServicesCommandHandler } from './app-health-create-infrastructure-services.command-handler';
import { AppHealthCreateInfrastructureServicesCommand } from './app-health-create-infrastructure-services.command';
import { AppHealthCreateInfrastructureServicesService } from './app-health-create-infrastructure-services.service';

describe('appHealthCreateInfrastructureServicesCommandHandler', () =>
{
    let commandHandler: AppHealthCreateInfrastructureServicesCommandHandler;
    let service: AppHealthCreateInfrastructureServicesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateInfrastructureServicesCommandHandler,
                {
                    provide : AppHealthCreateInfrastructureServicesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthCreateInfrastructureServicesCommandHandler>(AppHealthCreateInfrastructureServicesCommandHandler);
        service = module.get<AppHealthCreateInfrastructureServicesService>(AppHealthCreateInfrastructureServicesService);
    });

    describe('main', () =>
    {
        test('AppHealthCreateInfrastructureServicesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return AppHealthMockInfrastructureServiceData createds', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthCreateInfrastructureServicesCommand(
                    appHealthMockInfrastructureServiceData,
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
