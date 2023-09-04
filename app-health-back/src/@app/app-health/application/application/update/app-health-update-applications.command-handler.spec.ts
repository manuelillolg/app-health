import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockApplicationData } from '@app/app-health/application/infrastructure/mock/app-health-mock-application.data';
import { AppHealthUpdateApplicationsCommandHandler } from './app-health-update-applications.command-handler';
import { AppHealthUpdateApplicationsCommand } from './app-health-update-applications.command';
import { AppHealthUpdateApplicationsService } from './app-health-update-applications.service';

describe('AppHealthUpdateApplicationsCommandHandler', () =>
{
    let commandHandler: AppHealthUpdateApplicationsCommandHandler;
    let service: AppHealthUpdateApplicationsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthUpdateApplicationsCommandHandler,
                {
                    provide : AppHealthUpdateApplicationsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthUpdateApplicationsCommandHandler>(AppHealthUpdateApplicationsCommandHandler);
        service = module.get<AppHealthUpdateApplicationsService>(AppHealthUpdateApplicationsService);
    });

    describe('main', () =>
    {
        test('UpdateApplicationsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an applications updated', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthUpdateApplicationsCommand(
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
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
