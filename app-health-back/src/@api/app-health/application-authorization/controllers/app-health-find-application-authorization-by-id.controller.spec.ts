import { AppHealthFindApplicationAuthorizationByIdController, AppHealthFindApplicationAuthorizationByIdHandler } from '@api/app-health/application-authorization';
import { appHealthMockApplicationAuthorizationData } from '@app/app-health/application-authorization';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindApplicationAuthorizationByIdController', () =>
{
    let controller: AppHealthFindApplicationAuthorizationByIdController;
    let handler: AppHealthFindApplicationAuthorizationByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthFindApplicationAuthorizationByIdController,
            ],
            providers: [
                {
                    provide : AppHealthFindApplicationAuthorizationByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthFindApplicationAuthorizationByIdController>(AppHealthFindApplicationAuthorizationByIdController);
        handler = module.get<AppHealthFindApplicationAuthorizationByIdHandler>(AppHealthFindApplicationAuthorizationByIdHandler);
    });

    describe('main', () =>
    {
        test('AppHealthFindApplicationAuthorizationByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an applicationAuthorization by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationAuthorizationData[0])));
            expect(await controller.main(appHealthMockApplicationAuthorizationData[0].id)).toBe(appHealthMockApplicationAuthorizationData[0]);
        });
    });
});
