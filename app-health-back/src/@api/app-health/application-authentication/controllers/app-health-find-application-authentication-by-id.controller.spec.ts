import { AppHealthFindApplicationAuthenticationByIdController, AppHealthFindApplicationAuthenticationByIdHandler } from '@api/app-health/application-authentication';
import { appHealthMockApplicationAuthenticationData } from '@app/app-health/application-authentication';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindApplicationAuthenticationByIdController', () =>
{
    let controller: AppHealthFindApplicationAuthenticationByIdController;
    let handler: AppHealthFindApplicationAuthenticationByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthFindApplicationAuthenticationByIdController,
            ],
            providers: [
                {
                    provide : AppHealthFindApplicationAuthenticationByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthFindApplicationAuthenticationByIdController>(AppHealthFindApplicationAuthenticationByIdController);
        handler = module.get<AppHealthFindApplicationAuthenticationByIdHandler>(AppHealthFindApplicationAuthenticationByIdHandler);
    });

    describe('main', () =>
    {
        test('AppHealthFindApplicationAuthenticationByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an applicationAuthentication by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationAuthenticationData[0])));
            expect(await controller.main(appHealthMockApplicationAuthenticationData[0].id)).toBe(appHealthMockApplicationAuthenticationData[0]);
        });
    });
});
