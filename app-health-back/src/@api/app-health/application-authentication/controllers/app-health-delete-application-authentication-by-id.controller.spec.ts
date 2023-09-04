/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthDeleteApplicationAuthenticationByIdController, AppHealthDeleteApplicationAuthenticationByIdHandler } from '@api/app-health/application-authentication';
import { appHealthMockApplicationAuthenticationData } from '@app/app-health/application-authentication';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteApplicationAuthenticationByIdController', () =>
{
    let controller: AppHealthDeleteApplicationAuthenticationByIdController;
    let handler: AppHealthDeleteApplicationAuthenticationByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthDeleteApplicationAuthenticationByIdController,
            ],
            providers: [
                {
                    provide : AppHealthDeleteApplicationAuthenticationByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthDeleteApplicationAuthenticationByIdController>(AppHealthDeleteApplicationAuthenticationByIdController);
        handler = module.get<AppHealthDeleteApplicationAuthenticationByIdHandler>(AppHealthDeleteApplicationAuthenticationByIdHandler);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteApplicationAuthenticationByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an applicationAuthentication deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationAuthenticationData[0])));
            expect(await controller.main(appHealthMockApplicationAuthenticationData[0].id)).toBe(appHealthMockApplicationAuthenticationData[0]);
        });
    });
});
