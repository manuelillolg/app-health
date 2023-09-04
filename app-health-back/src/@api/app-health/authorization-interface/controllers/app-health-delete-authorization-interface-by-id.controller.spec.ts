/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthDeleteAuthorizationInterfaceByIdController, AppHealthDeleteAuthorizationInterfaceByIdHandler } from '@api/app-health/authorization-interface';
import { appHealthMockAuthorizationInterfaceData } from '@app/app-health/authorization-interface';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteAuthorizationInterfaceByIdController', () =>
{
    let controller: AppHealthDeleteAuthorizationInterfaceByIdController;
    let handler: AppHealthDeleteAuthorizationInterfaceByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthDeleteAuthorizationInterfaceByIdController,
            ],
            providers: [
                {
                    provide : AppHealthDeleteAuthorizationInterfaceByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthDeleteAuthorizationInterfaceByIdController>(AppHealthDeleteAuthorizationInterfaceByIdController);
        handler = module.get<AppHealthDeleteAuthorizationInterfaceByIdHandler>(AppHealthDeleteAuthorizationInterfaceByIdHandler);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteAuthorizationInterfaceByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an authorizationInterface deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockAuthorizationInterfaceData[0])));
            expect(await controller.main(appHealthMockAuthorizationInterfaceData[0].id)).toBe(appHealthMockAuthorizationInterfaceData[0]);
        });
    });
});
