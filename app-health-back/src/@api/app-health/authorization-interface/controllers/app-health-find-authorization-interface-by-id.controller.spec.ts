import { AppHealthFindAuthorizationInterfaceByIdController, AppHealthFindAuthorizationInterfaceByIdHandler } from '@api/app-health/authorization-interface';
import { appHealthMockAuthorizationInterfaceData } from '@app/app-health/authorization-interface';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindAuthorizationInterfaceByIdController', () =>
{
    let controller: AppHealthFindAuthorizationInterfaceByIdController;
    let handler: AppHealthFindAuthorizationInterfaceByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthFindAuthorizationInterfaceByIdController,
            ],
            providers: [
                {
                    provide : AppHealthFindAuthorizationInterfaceByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthFindAuthorizationInterfaceByIdController>(AppHealthFindAuthorizationInterfaceByIdController);
        handler = module.get<AppHealthFindAuthorizationInterfaceByIdHandler>(AppHealthFindAuthorizationInterfaceByIdHandler);
    });

    describe('main', () =>
    {
        test('AppHealthFindAuthorizationInterfaceByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an authorizationInterface by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockAuthorizationInterfaceData[0])));
            expect(await controller.main(appHealthMockAuthorizationInterfaceData[0].id)).toBe(appHealthMockAuthorizationInterfaceData[0]);
        });
    });
});
