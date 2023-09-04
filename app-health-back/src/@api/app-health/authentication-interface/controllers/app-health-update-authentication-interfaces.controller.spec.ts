import { AppHealthUpdateAuthenticationInterfacesController, AppHealthUpdateAuthenticationInterfacesHandler } from '@api/app-health/authentication-interface';
import { appHealthMockAuthenticationInterfaceData } from '@app/app-health/authentication-interface';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateAuthenticationInterfacesController', () =>
{
    let controller: AppHealthUpdateAuthenticationInterfacesController;
    let handler: AppHealthUpdateAuthenticationInterfacesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthUpdateAuthenticationInterfacesController,
            ],
            providers: [
                {
                    provide : AppHealthUpdateAuthenticationInterfacesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthUpdateAuthenticationInterfacesController>(AppHealthUpdateAuthenticationInterfacesController);
        handler = module.get<AppHealthUpdateAuthenticationInterfacesHandler>(AppHealthUpdateAuthenticationInterfacesHandler);
    });

    describe('main', () =>
    {
        test('AppHealthUpdateAuthenticationInterfacesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a authenticationInterfaces updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockAuthenticationInterfaceData[0])));
            expect(await controller.main(appHealthMockAuthenticationInterfaceData[0])).toBe(appHealthMockAuthenticationInterfaceData[0]);
        });
    });
});
