import { AppHealthPaginateAuthenticationInterfacesController, AppHealthPaginateAuthenticationInterfacesHandler } from '@api/app-health/authentication-interface';
import { appHealthMockAuthenticationInterfaceData } from '@app/app-health/authentication-interface';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthPaginateAuthenticationInterfacesController', () =>
{
    let controller: AppHealthPaginateAuthenticationInterfacesController;
    let handler: AppHealthPaginateAuthenticationInterfacesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthPaginateAuthenticationInterfacesController,
            ],
            providers: [
                {
                    provide : AppHealthPaginateAuthenticationInterfacesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthPaginateAuthenticationInterfacesController>(AppHealthPaginateAuthenticationInterfacesController);
        handler = module.get<AppHealthPaginateAuthenticationInterfacesHandler>(AppHealthPaginateAuthenticationInterfacesHandler);
    });

    describe('main', () =>
    {
        test('AppHealthPaginateAuthenticationInterfacesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a appHealthMockAuthenticationInterfaceData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : appHealthMockAuthenticationInterfaceData,
            })));
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : appHealthMockAuthenticationInterfaceData,
            });
        });
    });
});
