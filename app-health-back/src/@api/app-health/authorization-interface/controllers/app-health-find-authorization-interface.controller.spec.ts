import { AppHealthFindAuthorizationInterfaceController, AppHealthFindAuthorizationInterfaceHandler } from '@api/app-health/authorization-interface';
import { appHealthMockAuthorizationInterfaceData } from '@app/app-health/authorization-interface';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindAuthorizationInterfaceController', () =>
{
    let controller: AppHealthFindAuthorizationInterfaceController;
    let handler: AppHealthFindAuthorizationInterfaceHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthFindAuthorizationInterfaceController,
            ],
            providers: [
                {
                    provide : AppHealthFindAuthorizationInterfaceHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthFindAuthorizationInterfaceController>(AppHealthFindAuthorizationInterfaceController);
        handler = module.get<AppHealthFindAuthorizationInterfaceHandler>(AppHealthFindAuthorizationInterfaceHandler);
    });

    describe('main', () =>
    {
        test('AppHealthFindAuthorizationInterfaceController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a authorizationInterface', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockAuthorizationInterfaceData[0])));
            expect(await controller.main()).toBe(appHealthMockAuthorizationInterfaceData[0]);
        });
    });
});
