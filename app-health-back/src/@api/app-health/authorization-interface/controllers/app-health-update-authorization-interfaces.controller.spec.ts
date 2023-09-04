import { AppHealthUpdateAuthorizationInterfacesController, AppHealthUpdateAuthorizationInterfacesHandler } from '@api/app-health/authorization-interface';
import { appHealthMockAuthorizationInterfaceData } from '@app/app-health/authorization-interface';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateAuthorizationInterfacesController', () =>
{
    let controller: AppHealthUpdateAuthorizationInterfacesController;
    let handler: AppHealthUpdateAuthorizationInterfacesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthUpdateAuthorizationInterfacesController,
            ],
            providers: [
                {
                    provide : AppHealthUpdateAuthorizationInterfacesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthUpdateAuthorizationInterfacesController>(AppHealthUpdateAuthorizationInterfacesController);
        handler = module.get<AppHealthUpdateAuthorizationInterfacesHandler>(AppHealthUpdateAuthorizationInterfacesHandler);
    });

    describe('main', () =>
    {
        test('AppHealthUpdateAuthorizationInterfacesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a authorizationInterfaces updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockAuthorizationInterfaceData[0])));
            expect(await controller.main(appHealthMockAuthorizationInterfaceData[0])).toBe(appHealthMockAuthorizationInterfaceData[0]);
        });
    });
});
