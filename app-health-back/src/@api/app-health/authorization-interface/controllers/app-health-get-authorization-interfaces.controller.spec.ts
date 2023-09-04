import { AppHealthGetAuthorizationInterfacesController, AppHealthGetAuthorizationInterfacesHandler } from '@api/app-health/authorization-interface';
import { appHealthMockAuthorizationInterfaceData } from '@app/app-health/authorization-interface';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthGetAuthorizationInterfacesController', () =>
{
    let controller: AppHealthGetAuthorizationInterfacesController;
    let handler: AppHealthGetAuthorizationInterfacesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthGetAuthorizationInterfacesController,
            ],
            providers: [
                {
                    provide : AppHealthGetAuthorizationInterfacesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthGetAuthorizationInterfacesController>(AppHealthGetAuthorizationInterfacesController);
        handler = module.get<AppHealthGetAuthorizationInterfacesHandler>(AppHealthGetAuthorizationInterfacesHandler);
    });

    describe('main', () =>
    {
        test('AppHealthGetAuthorizationInterfacesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a appHealthMockAuthorizationInterfaceData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockAuthorizationInterfaceData)));
            expect(await controller.main()).toBe(appHealthMockAuthorizationInterfaceData);
        });
    });
});
