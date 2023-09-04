import { AppHealthCreateApplicationIntegrationController, AppHealthCreateApplicationIntegrationHandler } from '@api/app-health/application-integration';
import { appHealthMockApplicationIntegrationData } from '@app/app-health/application-integration';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateApplicationIntegrationController', () =>
{
    let controller: AppHealthCreateApplicationIntegrationController;
    let handler: AppHealthCreateApplicationIntegrationHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthCreateApplicationIntegrationController,
            ],
            providers: [
                {
                    provide : AppHealthCreateApplicationIntegrationHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthCreateApplicationIntegrationController>(AppHealthCreateApplicationIntegrationController);
        handler = module.get<AppHealthCreateApplicationIntegrationHandler>(AppHealthCreateApplicationIntegrationHandler);
    });

    describe('main', () =>
    {
        test('AppHealthCreateApplicationIntegrationController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an applicationIntegration created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationIntegrationData[0])));
            expect(
                await controller.main(
                    appHealthMockApplicationIntegrationData[0],
                ),
            )
                .toBe(appHealthMockApplicationIntegrationData[0]);
        });
    });
});
