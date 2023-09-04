import { AppHealthFindAuthenticationInterfaceByIdController, AppHealthFindAuthenticationInterfaceByIdHandler } from '@api/app-health/authentication-interface';
import { appHealthMockAuthenticationInterfaceData } from '@app/app-health/authentication-interface';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindAuthenticationInterfaceByIdController', () =>
{
    let controller: AppHealthFindAuthenticationInterfaceByIdController;
    let handler: AppHealthFindAuthenticationInterfaceByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthFindAuthenticationInterfaceByIdController,
            ],
            providers: [
                {
                    provide : AppHealthFindAuthenticationInterfaceByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthFindAuthenticationInterfaceByIdController>(AppHealthFindAuthenticationInterfaceByIdController);
        handler = module.get<AppHealthFindAuthenticationInterfaceByIdHandler>(AppHealthFindAuthenticationInterfaceByIdHandler);
    });

    describe('main', () =>
    {
        test('AppHealthFindAuthenticationInterfaceByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an authenticationInterface by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockAuthenticationInterfaceData[0])));
            expect(await controller.main(appHealthMockAuthenticationInterfaceData[0].id)).toBe(appHealthMockAuthenticationInterfaceData[0]);
        });
    });
});
