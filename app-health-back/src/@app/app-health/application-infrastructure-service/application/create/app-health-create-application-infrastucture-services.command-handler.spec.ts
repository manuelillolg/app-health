/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockApplicationInfrastructureServiceData } from '@app/app-health/application-infrastructure-service/infrastructure/mock/app-health-mock-application-infrastructure-service.data';
import { AppHealthCreateApplicationInfrastuctureServicesCommandHandler } from './app-health-create-application-infrastucture-services.command-handler';
import { AppHealthCreateApplicationInfrastuctureServicesCommand } from './app-health-create-application-infrastucture-services.command';
import { AppHealthCreateApplicationInfrastuctureServicesService } from './app-health-create-application-infrastucture-services.service';

describe('appHealthCreateApplicationInfrastuctureServicesCommandHandler', () =>
{
    let commandHandler: AppHealthCreateApplicationInfrastuctureServicesCommandHandler;
    let service: AppHealthCreateApplicationInfrastuctureServicesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateApplicationInfrastuctureServicesCommandHandler,
                {
                    provide : AppHealthCreateApplicationInfrastuctureServicesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthCreateApplicationInfrastuctureServicesCommandHandler>(AppHealthCreateApplicationInfrastuctureServicesCommandHandler);
        service = module.get<AppHealthCreateApplicationInfrastuctureServicesService>(AppHealthCreateApplicationInfrastuctureServicesService);
    });

    describe('main', () =>
    {
        test('AppHealthCreateApplicationInfrastuctureServicesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return AppHealthMockApplicationInfrastructureServiceData createds', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthCreateApplicationInfrastuctureServicesCommand(
                    appHealthMockApplicationInfrastructureServiceData,
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
