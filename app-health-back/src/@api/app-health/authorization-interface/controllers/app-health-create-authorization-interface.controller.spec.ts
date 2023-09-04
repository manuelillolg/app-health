import { AppHealthCreateAuthorizationInterfaceController, AppHealthCreateAuthorizationInterfaceHandler } from '@api/app-health/authorization-interface';
import { appHealthMockAuthorizationInterfaceData } from '@app/app-health/authorization-interface';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateAuthorizationInterfaceController', () =>
{
    let controller: AppHealthCreateAuthorizationInterfaceController;
    let handler: AppHealthCreateAuthorizationInterfaceHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthCreateAuthorizationInterfaceController,
            ],
            providers: [
                {
                    provide : AppHealthCreateAuthorizationInterfaceHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthCreateAuthorizationInterfaceController>(AppHealthCreateAuthorizationInterfaceController);
        handler = module.get<AppHealthCreateAuthorizationInterfaceHandler>(AppHealthCreateAuthorizationInterfaceHandler);
    });

    describe('main', () =>
    {
        test('AppHealthCreateAuthorizationInterfaceController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an authorizationInterface created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockAuthorizationInterfaceData[0])));
            expect(
                await controller.main(
                    appHealthMockAuthorizationInterfaceData[0],
                ),
            )
                .toBe(appHealthMockAuthorizationInterfaceData[0]);
        });
    });
});
