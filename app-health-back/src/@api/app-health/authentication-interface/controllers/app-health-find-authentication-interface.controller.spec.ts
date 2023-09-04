import { AppHealthFindAuthenticationInterfaceController, AppHealthFindAuthenticationInterfaceHandler } from '@api/app-health/authentication-interface';
import { appHealthMockAuthenticationInterfaceData } from '@app/app-health/authentication-interface';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindAuthenticationInterfaceController', () =>
{
    let controller: AppHealthFindAuthenticationInterfaceController;
    let handler: AppHealthFindAuthenticationInterfaceHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthFindAuthenticationInterfaceController,
            ],
            providers: [
                {
                    provide : AppHealthFindAuthenticationInterfaceHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthFindAuthenticationInterfaceController>(AppHealthFindAuthenticationInterfaceController);
        handler = module.get<AppHealthFindAuthenticationInterfaceHandler>(AppHealthFindAuthenticationInterfaceHandler);
    });

    describe('main', () =>
    {
        test('AppHealthFindAuthenticationInterfaceController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a authenticationInterface', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockAuthenticationInterfaceData[0])));
            expect(await controller.main()).toBe(appHealthMockAuthenticationInterfaceData[0]);
        });
    });
});
