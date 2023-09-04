import { AppHealthCreateApplicationCommandHandler } from './app-health-create-application.command-handler';
import { AppHealthCreateApplicationService } from './app-health-create-application.service';
import { AppHealthCreateApplicationCommand, appHealthMockApplicationData } from '@app/app-health/application';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateApplicationCommandHandler', () =>
{
    let commandHandler: AppHealthCreateApplicationCommandHandler;
    let service: AppHealthCreateApplicationService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateApplicationCommandHandler,
                {
                    provide : AppHealthCreateApplicationService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthCreateApplicationCommandHandler>(AppHealthCreateApplicationCommandHandler);
        service = module.get<AppHealthCreateApplicationService>(AppHealthCreateApplicationService);
    });

    describe('main', () =>
    {
        test('CreateApplicationCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the AppHealthCreateApplicationService', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthCreateApplicationCommand(
                    {
                        id: appHealthMockApplicationData[0].id,
                        technicalSolutionId: appHealthMockApplicationData[0].technicalSolutionId,
                        name: appHealthMockApplicationData[0].name,
                        description: appHealthMockApplicationData[0].description,
                        businessImpact: appHealthMockApplicationData[0].businessImpact,
                        type: appHealthMockApplicationData[0].type,
                        releaseDate: appHealthMockApplicationData[0].releaseDate,
                        architectureDiagram: appHealthMockApplicationData[0].architectureDiagram,
                        hasTenants: appHealthMockApplicationData[0].hasTenants,
                        hasLicensing: appHealthMockApplicationData[0].hasLicensing,
                        costLicensesPerYear: appHealthMockApplicationData[0].costLicensesPerYear,
                        requestsPerDay: appHealthMockApplicationData[0].requestsPerDay,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
