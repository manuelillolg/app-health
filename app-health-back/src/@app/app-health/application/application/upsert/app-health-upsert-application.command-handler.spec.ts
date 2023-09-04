import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockApplicationData } from '@app/app-health/application/infrastructure/mock/app-health-mock-application.data';
import { AppHealthUpsertApplicationCommandHandler } from './app-health-upsert-application.command-handler';
import { AppHealthUpsertApplicationCommand } from './app-health-upsert-application.command';
import { AppHealthUpsertApplicationService } from './app-health-upsert-application.service';

describe('AppHealthUpsertApplicationCommandHandler', () =>
{
    let commandHandler: AppHealthUpsertApplicationCommandHandler;
    let service: AppHealthUpsertApplicationService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthUpsertApplicationCommandHandler,
                {
                    provide : AppHealthUpsertApplicationService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthUpsertApplicationCommandHandler>(AppHealthUpsertApplicationCommandHandler);
        service = module.get<AppHealthUpsertApplicationService>(AppHealthUpsertApplicationService);
    });

    describe('main', () =>
    {
        test('UpsertApplicationCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the AppHealthUpsertApplicationService', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthUpsertApplicationCommand(
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
