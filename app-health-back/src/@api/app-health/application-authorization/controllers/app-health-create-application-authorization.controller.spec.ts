import { AppHealthCreateApplicationAuthorizationController, AppHealthCreateApplicationAuthorizationHandler } from '@api/app-health/application-authorization';
import { appHealthMockApplicationAuthorizationData } from '@app/app-health/application-authorization';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateApplicationAuthorizationController', () =>
{
    let controller: AppHealthCreateApplicationAuthorizationController;
    let handler: AppHealthCreateApplicationAuthorizationHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthCreateApplicationAuthorizationController,
            ],
            providers: [
                {
                    provide : AppHealthCreateApplicationAuthorizationHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthCreateApplicationAuthorizationController>(AppHealthCreateApplicationAuthorizationController);
        handler = module.get<AppHealthCreateApplicationAuthorizationHandler>(AppHealthCreateApplicationAuthorizationHandler);
    });

    describe('main', () =>
    {
        test('AppHealthCreateApplicationAuthorizationController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an applicationAuthorization created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationAuthorizationData[0])));
            expect(
                await controller.main(
                    appHealthMockApplicationAuthorizationData[0],
                ),
            )
                .toBe(appHealthMockApplicationAuthorizationData[0]);
        });
    });
});
