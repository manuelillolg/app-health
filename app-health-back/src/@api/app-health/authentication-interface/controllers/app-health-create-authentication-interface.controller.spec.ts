import { AppHealthCreateAuthenticationInterfaceController, AppHealthCreateAuthenticationInterfaceHandler } from '@api/app-health/authentication-interface';
import { appHealthMockAuthenticationInterfaceData } from '@app/app-health/authentication-interface';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateAuthenticationInterfaceController', () =>
{
    let controller: AppHealthCreateAuthenticationInterfaceController;
    let handler: AppHealthCreateAuthenticationInterfaceHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthCreateAuthenticationInterfaceController,
            ],
            providers: [
                {
                    provide : AppHealthCreateAuthenticationInterfaceHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthCreateAuthenticationInterfaceController>(AppHealthCreateAuthenticationInterfaceController);
        handler = module.get<AppHealthCreateAuthenticationInterfaceHandler>(AppHealthCreateAuthenticationInterfaceHandler);
    });

    describe('main', () =>
    {
        test('AppHealthCreateAuthenticationInterfaceController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an authenticationInterface created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockAuthenticationInterfaceData[0])));
            expect(
                await controller.main(
                    appHealthMockAuthenticationInterfaceData[0],
                ),
            )
                .toBe(appHealthMockAuthenticationInterfaceData[0]);
        });
    });
});
