import { AppHealthCreateAuthenticationInterfacesController, AppHealthCreateAuthenticationInterfacesHandler } from '@api/app-health/authentication-interface';
import { appHealthMockAuthenticationInterfaceData } from '@app/app-health/authentication-interface';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateAuthenticationInterfacesController', () =>
{
    let controller: AppHealthCreateAuthenticationInterfacesController;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                AppHealthCreateAuthenticationInterfacesController,
            ],
            providers: [
                {
                    provide : AppHealthCreateAuthenticationInterfacesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthCreateAuthenticationInterfacesController>(AppHealthCreateAuthenticationInterfacesController);
    });

    describe('main', () =>
    {
        test('AppHealthCreateAuthenticationInterfacesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an appHealthMockAuthenticationInterfaceData created', async () =>
        {
            expect(
                await controller.main(
                    appHealthMockAuthenticationInterfaceData,
                ),
            )
                .toBe(undefined);
        });
    });
});
