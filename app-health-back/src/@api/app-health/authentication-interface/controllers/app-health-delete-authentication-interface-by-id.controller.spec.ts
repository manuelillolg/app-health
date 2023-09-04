/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthDeleteAuthenticationInterfaceByIdController, AppHealthDeleteAuthenticationInterfaceByIdHandler } from '@api/app-health/authentication-interface';
import { appHealthMockAuthenticationInterfaceData } from '@app/app-health/authentication-interface';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteAuthenticationInterfaceByIdController', () =>
{
    let controller: AppHealthDeleteAuthenticationInterfaceByIdController;
    let handler: AppHealthDeleteAuthenticationInterfaceByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthDeleteAuthenticationInterfaceByIdController,
            ],
            providers: [
                {
                    provide : AppHealthDeleteAuthenticationInterfaceByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthDeleteAuthenticationInterfaceByIdController>(AppHealthDeleteAuthenticationInterfaceByIdController);
        handler = module.get<AppHealthDeleteAuthenticationInterfaceByIdHandler>(AppHealthDeleteAuthenticationInterfaceByIdHandler);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteAuthenticationInterfaceByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an authenticationInterface deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockAuthenticationInterfaceData[0])));
            expect(await controller.main(appHealthMockAuthenticationInterfaceData[0].id)).toBe(appHealthMockAuthenticationInterfaceData[0]);
        });
    });
});
