import { AppHealthFindApplicationAuthorizationController, AppHealthFindApplicationAuthorizationHandler } from '@api/app-health/application-authorization';
import { appHealthMockApplicationAuthorizationData } from '@app/app-health/application-authorization';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindApplicationAuthorizationController', () =>
{
    let controller: AppHealthFindApplicationAuthorizationController;
    let handler: AppHealthFindApplicationAuthorizationHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthFindApplicationAuthorizationController,
            ],
            providers: [
                {
                    provide : AppHealthFindApplicationAuthorizationHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthFindApplicationAuthorizationController>(AppHealthFindApplicationAuthorizationController);
        handler = module.get<AppHealthFindApplicationAuthorizationHandler>(AppHealthFindApplicationAuthorizationHandler);
    });

    describe('main', () =>
    {
        test('AppHealthFindApplicationAuthorizationController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a applicationAuthorization', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationAuthorizationData[0])));
            expect(await controller.main()).toBe(appHealthMockApplicationAuthorizationData[0]);
        });
    });
});
