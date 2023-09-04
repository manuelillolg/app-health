import { AppHealthDeleteAuthorizationInterfacesController, AppHealthDeleteAuthorizationInterfacesHandler } from '@api/app-health/authorization-interface';
import { appHealthMockAuthorizationInterfaceData } from '@app/app-health/authorization-interface';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteAuthorizationInterfacesController', () =>
{
    let controller: AppHealthDeleteAuthorizationInterfacesController;
    let handler: AppHealthDeleteAuthorizationInterfacesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthDeleteAuthorizationInterfacesController,
            ],
            providers: [
                {
                    provide : AppHealthDeleteAuthorizationInterfacesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthDeleteAuthorizationInterfacesController>(AppHealthDeleteAuthorizationInterfacesController);
        handler = module.get<AppHealthDeleteAuthorizationInterfacesHandler>(AppHealthDeleteAuthorizationInterfacesHandler);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteAuthorizationInterfacesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an appHealthMockAuthorizationInterfaceData deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockAuthorizationInterfaceData)));
            expect(await controller.main()).toBe(appHealthMockAuthorizationInterfaceData);
        });
    });
});
