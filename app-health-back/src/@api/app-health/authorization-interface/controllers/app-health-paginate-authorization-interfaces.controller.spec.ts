import { AppHealthPaginateAuthorizationInterfacesController, AppHealthPaginateAuthorizationInterfacesHandler } from '@api/app-health/authorization-interface';
import { appHealthMockAuthorizationInterfaceData } from '@app/app-health/authorization-interface';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthPaginateAuthorizationInterfacesController', () =>
{
    let controller: AppHealthPaginateAuthorizationInterfacesController;
    let handler: AppHealthPaginateAuthorizationInterfacesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthPaginateAuthorizationInterfacesController,
            ],
            providers: [
                {
                    provide : AppHealthPaginateAuthorizationInterfacesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthPaginateAuthorizationInterfacesController>(AppHealthPaginateAuthorizationInterfacesController);
        handler = module.get<AppHealthPaginateAuthorizationInterfacesHandler>(AppHealthPaginateAuthorizationInterfacesHandler);
    });

    describe('main', () =>
    {
        test('AppHealthPaginateAuthorizationInterfacesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a appHealthMockAuthorizationInterfaceData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : appHealthMockAuthorizationInterfaceData,
            })));
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : appHealthMockAuthorizationInterfaceData,
            });
        });
    });
});
