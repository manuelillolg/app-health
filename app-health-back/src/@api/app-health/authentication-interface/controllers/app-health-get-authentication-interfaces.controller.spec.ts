import { AppHealthGetAuthenticationInterfacesController, AppHealthGetAuthenticationInterfacesHandler } from '@api/app-health/authentication-interface';
import { appHealthMockAuthenticationInterfaceData } from '@app/app-health/authentication-interface';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthGetAuthenticationInterfacesController', () =>
{
    let controller: AppHealthGetAuthenticationInterfacesController;
    let handler: AppHealthGetAuthenticationInterfacesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthGetAuthenticationInterfacesController,
            ],
            providers: [
                {
                    provide : AppHealthGetAuthenticationInterfacesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthGetAuthenticationInterfacesController>(AppHealthGetAuthenticationInterfacesController);
        handler = module.get<AppHealthGetAuthenticationInterfacesHandler>(AppHealthGetAuthenticationInterfacesHandler);
    });

    describe('main', () =>
    {
        test('AppHealthGetAuthenticationInterfacesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a appHealthMockAuthenticationInterfaceData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockAuthenticationInterfaceData)));
            expect(await controller.main()).toBe(appHealthMockAuthenticationInterfaceData);
        });
    });
});
