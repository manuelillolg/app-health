import { AppHealthFindApplicationAuthenticationController, AppHealthFindApplicationAuthenticationHandler } from '@api/app-health/application-authentication';
import { appHealthMockApplicationAuthenticationData } from '@app/app-health/application-authentication';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindApplicationAuthenticationController', () =>
{
    let controller: AppHealthFindApplicationAuthenticationController;
    let handler: AppHealthFindApplicationAuthenticationHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthFindApplicationAuthenticationController,
            ],
            providers: [
                {
                    provide : AppHealthFindApplicationAuthenticationHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthFindApplicationAuthenticationController>(AppHealthFindApplicationAuthenticationController);
        handler = module.get<AppHealthFindApplicationAuthenticationHandler>(AppHealthFindApplicationAuthenticationHandler);
    });

    describe('main', () =>
    {
        test('AppHealthFindApplicationAuthenticationController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a applicationAuthentication', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationAuthenticationData[0])));
            expect(await controller.main()).toBe(appHealthMockApplicationAuthenticationData[0]);
        });
    });
});
