import { AppHealthUpsertApplicationAuthorizationController, AppHealthUpsertApplicationAuthorizationHandler } from '@api/app-health/application-authorization';
import { appHealthMockApplicationAuthorizationData } from '@app/app-health/application-authorization';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpsertApplicationAuthorizationController', () =>
{
    let controller: AppHealthUpsertApplicationAuthorizationController;
    let handler: AppHealthUpsertApplicationAuthorizationHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthUpsertApplicationAuthorizationController,
            ],
            providers: [
                {
                    provide : AppHealthUpsertApplicationAuthorizationHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthUpsertApplicationAuthorizationController>(AppHealthUpsertApplicationAuthorizationController);
        handler = module.get<AppHealthUpsertApplicationAuthorizationHandler>(AppHealthUpsertApplicationAuthorizationHandler);
    });

    describe('main', () =>
    {
        test('AppHealthUpsertApplicationAuthorizationController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an applicationAuthorization upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationAuthorizationData[0])));
            expect(await controller.main(appHealthMockApplicationAuthorizationData[0])).toBe(appHealthMockApplicationAuthorizationData[0]);
        });
    });
});
