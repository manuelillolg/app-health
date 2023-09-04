import { AppHealthPaginateApplicationIntegrationsController, AppHealthPaginateApplicationIntegrationsHandler } from '@api/app-health/application-integration';
import { appHealthMockApplicationIntegrationData } from '@app/app-health/application-integration';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthPaginateApplicationIntegrationsController', () =>
{
    let controller: AppHealthPaginateApplicationIntegrationsController;
    let handler: AppHealthPaginateApplicationIntegrationsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthPaginateApplicationIntegrationsController,
            ],
            providers: [
                {
                    provide : AppHealthPaginateApplicationIntegrationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthPaginateApplicationIntegrationsController>(AppHealthPaginateApplicationIntegrationsController);
        handler = module.get<AppHealthPaginateApplicationIntegrationsHandler>(AppHealthPaginateApplicationIntegrationsHandler);
    });

    describe('main', () =>
    {
        test('AppHealthPaginateApplicationIntegrationsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a appHealthMockApplicationIntegrationData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : appHealthMockApplicationIntegrationData,
            })));
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : appHealthMockApplicationIntegrationData,
            });
        });
    });
});
