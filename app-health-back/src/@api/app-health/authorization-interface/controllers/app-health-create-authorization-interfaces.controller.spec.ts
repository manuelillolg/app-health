import { AppHealthCreateAuthorizationInterfacesController, AppHealthCreateAuthorizationInterfacesHandler } from '@api/app-health/authorization-interface';
import { appHealthMockAuthorizationInterfaceData } from '@app/app-health/authorization-interface';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateAuthorizationInterfacesController', () =>
{
    let controller: AppHealthCreateAuthorizationInterfacesController;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                AppHealthCreateAuthorizationInterfacesController,
            ],
            providers: [
                {
                    provide : AppHealthCreateAuthorizationInterfacesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthCreateAuthorizationInterfacesController>(AppHealthCreateAuthorizationInterfacesController);
    });

    describe('main', () =>
    {
        test('AppHealthCreateAuthorizationInterfacesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an appHealthMockAuthorizationInterfaceData created', async () =>
        {
            expect(
                await controller.main(
                    appHealthMockAuthorizationInterfaceData,
                ),
            )
                .toBe(undefined);
        });
    });
});
