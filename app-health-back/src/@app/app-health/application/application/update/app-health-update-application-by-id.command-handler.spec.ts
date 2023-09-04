import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { appHealthMockApplicationData } from '@app/app-health/application/infrastructure/mock/app-health-mock-application.data';
import { AppHealthUpdateApplicationByIdCommandHandler } from './app-health-update-application-by-id.command-handler';
import { AppHealthUpdateApplicationByIdCommand } from './app-health-update-application-by-id.command';
import { AppHealthUpdateApplicationByIdService } from './app-health-update-application-by-id.service';

describe('AppHealthUpdateApplicationByIdCommandHandler', () =>
{
    let commandHandler: AppHealthUpdateApplicationByIdCommandHandler;
    let service: AppHealthUpdateApplicationByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthUpdateApplicationByIdCommandHandler,
                {
                    provide : AppHealthUpdateApplicationByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AppHealthUpdateApplicationByIdCommandHandler>(AppHealthUpdateApplicationByIdCommandHandler);
        service = module.get<AppHealthUpdateApplicationByIdService>(AppHealthUpdateApplicationByIdService);
    });

    describe('main', () =>
    {
        test('UpdateApplicationByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an application created', async () =>
        {
            expect(await commandHandler.execute(
                new AppHealthUpdateApplicationByIdCommand(
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
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
