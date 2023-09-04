import { AppHealthUpsertApplicationAuthenticationController, AppHealthUpsertApplicationAuthenticationHandler } from '@api/app-health/application-authentication';
import { appHealthMockApplicationAuthenticationData } from '@app/app-health/application-authentication';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpsertApplicationAuthenticationController', () =>
{
    let controller: AppHealthUpsertApplicationAuthenticationController;
    let handler: AppHealthUpsertApplicationAuthenticationHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthUpsertApplicationAuthenticationController,
            ],
            providers: [
                {
                    provide : AppHealthUpsertApplicationAuthenticationHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthUpsertApplicationAuthenticationController>(AppHealthUpsertApplicationAuthenticationController);
        handler = module.get<AppHealthUpsertApplicationAuthenticationHandler>(AppHealthUpsertApplicationAuthenticationHandler);
    });

    describe('main', () =>
    {
        test('AppHealthUpsertApplicationAuthenticationController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an applicationAuthentication upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationAuthenticationData[0])));
            expect(await controller.main(appHealthMockApplicationAuthenticationData[0])).toBe(appHealthMockApplicationAuthenticationData[0]);
        });
    });
});
