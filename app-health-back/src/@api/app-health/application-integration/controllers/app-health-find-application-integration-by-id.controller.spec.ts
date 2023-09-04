import { AppHealthFindApplicationIntegrationByIdController, AppHealthFindApplicationIntegrationByIdHandler } from '@api/app-health/application-integration';
import { appHealthMockApplicationIntegrationData } from '@app/app-health/application-integration';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindApplicationIntegrationByIdController', () =>
{
    let controller: AppHealthFindApplicationIntegrationByIdController;
    let handler: AppHealthFindApplicationIntegrationByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthFindApplicationIntegrationByIdController,
            ],
            providers: [
                {
                    provide : AppHealthFindApplicationIntegrationByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthFindApplicationIntegrationByIdController>(AppHealthFindApplicationIntegrationByIdController);
        handler = module.get<AppHealthFindApplicationIntegrationByIdHandler>(AppHealthFindApplicationIntegrationByIdHandler);
    });

    describe('main', () =>
    {
        test('AppHealthFindApplicationIntegrationByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an applicationIntegration by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationIntegrationData[0])));
            expect(await controller.main(appHealthMockApplicationIntegrationData[0].id)).toBe(appHealthMockApplicationIntegrationData[0]);
        });
    });
});
