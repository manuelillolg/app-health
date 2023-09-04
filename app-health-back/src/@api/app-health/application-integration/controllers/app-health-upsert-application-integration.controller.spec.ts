import { AppHealthUpsertApplicationIntegrationController, AppHealthUpsertApplicationIntegrationHandler } from '@api/app-health/application-integration';
import { appHealthMockApplicationIntegrationData } from '@app/app-health/application-integration';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpsertApplicationIntegrationController', () =>
{
    let controller: AppHealthUpsertApplicationIntegrationController;
    let handler: AppHealthUpsertApplicationIntegrationHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthUpsertApplicationIntegrationController,
            ],
            providers: [
                {
                    provide : AppHealthUpsertApplicationIntegrationHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthUpsertApplicationIntegrationController>(AppHealthUpsertApplicationIntegrationController);
        handler = module.get<AppHealthUpsertApplicationIntegrationHandler>(AppHealthUpsertApplicationIntegrationHandler);
    });

    describe('main', () =>
    {
        test('AppHealthUpsertApplicationIntegrationController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an applicationIntegration upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationIntegrationData[0])));
            expect(await controller.main(appHealthMockApplicationIntegrationData[0])).toBe(appHealthMockApplicationIntegrationData[0]);
        });
    });
});
