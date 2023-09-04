/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthDeleteApplicationAuthorizationByIdController, AppHealthDeleteApplicationAuthorizationByIdHandler } from '@api/app-health/application-authorization';
import { appHealthMockApplicationAuthorizationData } from '@app/app-health/application-authorization';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteApplicationAuthorizationByIdController', () =>
{
    let controller: AppHealthDeleteApplicationAuthorizationByIdController;
    let handler: AppHealthDeleteApplicationAuthorizationByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthDeleteApplicationAuthorizationByIdController,
            ],
            providers: [
                {
                    provide : AppHealthDeleteApplicationAuthorizationByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthDeleteApplicationAuthorizationByIdController>(AppHealthDeleteApplicationAuthorizationByIdController);
        handler = module.get<AppHealthDeleteApplicationAuthorizationByIdHandler>(AppHealthDeleteApplicationAuthorizationByIdHandler);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteApplicationAuthorizationByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an applicationAuthorization deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationAuthorizationData[0])));
            expect(await controller.main(appHealthMockApplicationAuthorizationData[0].id)).toBe(appHealthMockApplicationAuthorizationData[0]);
        });
    });
});
