import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthDeleteApplicationInfrastuctureServicesCommandHandler } from './app-health-delete-application-infrastucture-services.command-handler';
import { AppHealthDeleteApplicationInfrastuctureServicesCommand } from './app-health-delete-application-infrastucture-services.command';
import { AppHealthDeleteApplicationInfrastuctureServicesService } from './app-health-delete-application-infrastucture-services.service';

describe('AppHealthDeleteApplicationInfrastuctureServicesCommandHandler', () =>
{
    let commandHandler: AppHealthDeleteApplicationInfrastuctureServicesCommandHandler;
    let service: AppHealthDeleteApplicationInfrastuctureServicesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthDeleteApplicationInfrastuctureServicesCommandHandler,
                {
                    provide : AppHealthDeleteApplicationInfrastuctureServicesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthDeleteApplicationInfrastuctureServicesCommandHandler>(AppHealthDeleteApplicationInfrastuctureServicesCommandHandler);
        service = module.get<AppHealthDeleteApplicationInfrastuctureServicesService>(AppHealthDeleteApplicationInfrastuctureServicesService);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteApplicationInfrastuctureServicesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthDeleteApplicationInfrastuctureServicesCommand(),
            )).toBe(undefined);
        });
    });
});
