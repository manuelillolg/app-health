import { AppHealthUpdateApplicationAuthenticationByIdController, AppHealthUpdateApplicationAuthenticationByIdHandler } from '@api/app-health/application-authentication';
import { appHealthMockApplicationAuthenticationData } from '@app/app-health/application-authentication';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateApplicationAuthenticationByIdController', () =>
{
    let controller: AppHealthUpdateApplicationAuthenticationByIdController;
    let handler: AppHealthUpdateApplicationAuthenticationByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthUpdateApplicationAuthenticationByIdController,
            ],
            providers: [
                {
                    provide : AppHealthUpdateApplicationAuthenticationByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthUpdateApplicationAuthenticationByIdController>(AppHealthUpdateApplicationAuthenticationByIdController);
        handler = module.get<AppHealthUpdateApplicationAuthenticationByIdHandler>(AppHealthUpdateApplicationAuthenticationByIdHandler);
    });

    describe('main', () =>
    {
        test('AppHealthUpdateApplicationAuthenticationByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a applicationAuthentication updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationAuthenticationData[0])));
            expect(await controller.main(appHealthMockApplicationAuthenticationData[0])).toBe(appHealthMockApplicationAuthenticationData[0]);
        });
    });
});
