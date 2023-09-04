import { AppHealthDeleteAuthenticationInterfacesController, AppHealthDeleteAuthenticationInterfacesHandler } from '@api/app-health/authentication-interface';
import { appHealthMockAuthenticationInterfaceData } from '@app/app-health/authentication-interface';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteAuthenticationInterfacesController', () =>
{
    let controller: AppHealthDeleteAuthenticationInterfacesController;
    let handler: AppHealthDeleteAuthenticationInterfacesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthDeleteAuthenticationInterfacesController,
            ],
            providers: [
                {
                    provide : AppHealthDeleteAuthenticationInterfacesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthDeleteAuthenticationInterfacesController>(AppHealthDeleteAuthenticationInterfacesController);
        handler = module.get<AppHealthDeleteAuthenticationInterfacesHandler>(AppHealthDeleteAuthenticationInterfacesHandler);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteAuthenticationInterfacesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an appHealthMockAuthenticationInterfaceData deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockAuthenticationInterfaceData)));
            expect(await controller.main()).toBe(appHealthMockAuthenticationInterfaceData);
        });
    });
});
