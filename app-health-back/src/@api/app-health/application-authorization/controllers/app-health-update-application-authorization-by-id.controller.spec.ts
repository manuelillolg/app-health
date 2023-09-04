import { AppHealthUpdateApplicationAuthorizationByIdController, AppHealthUpdateApplicationAuthorizationByIdHandler } from '@api/app-health/application-authorization';
import { appHealthMockApplicationAuthorizationData } from '@app/app-health/application-authorization';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateApplicationAuthorizationByIdController', () =>
{
    let controller: AppHealthUpdateApplicationAuthorizationByIdController;
    let handler: AppHealthUpdateApplicationAuthorizationByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthUpdateApplicationAuthorizationByIdController,
            ],
            providers: [
                {
                    provide : AppHealthUpdateApplicationAuthorizationByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthUpdateApplicationAuthorizationByIdController>(AppHealthUpdateApplicationAuthorizationByIdController);
        handler = module.get<AppHealthUpdateApplicationAuthorizationByIdHandler>(AppHealthUpdateApplicationAuthorizationByIdHandler);
    });

    describe('main', () =>
    {
        test('AppHealthUpdateApplicationAuthorizationByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a applicationAuthorization updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationAuthorizationData[0])));
            expect(await controller.main(appHealthMockApplicationAuthorizationData[0])).toBe(appHealthMockApplicationAuthorizationData[0]);
        });
    });
});
