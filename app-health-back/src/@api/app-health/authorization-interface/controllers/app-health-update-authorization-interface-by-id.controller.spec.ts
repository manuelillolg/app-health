import { AppHealthUpdateAuthorizationInterfaceByIdController, AppHealthUpdateAuthorizationInterfaceByIdHandler } from '@api/app-health/authorization-interface';
import { appHealthMockAuthorizationInterfaceData } from '@app/app-health/authorization-interface';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateAuthorizationInterfaceByIdController', () =>
{
    let controller: AppHealthUpdateAuthorizationInterfaceByIdController;
    let handler: AppHealthUpdateAuthorizationInterfaceByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthUpdateAuthorizationInterfaceByIdController,
            ],
            providers: [
                {
                    provide : AppHealthUpdateAuthorizationInterfaceByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthUpdateAuthorizationInterfaceByIdController>(AppHealthUpdateAuthorizationInterfaceByIdController);
        handler = module.get<AppHealthUpdateAuthorizationInterfaceByIdHandler>(AppHealthUpdateAuthorizationInterfaceByIdHandler);
    });

    describe('main', () =>
    {
        test('AppHealthUpdateAuthorizationInterfaceByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a authorizationInterface updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockAuthorizationInterfaceData[0])));
            expect(await controller.main(appHealthMockAuthorizationInterfaceData[0])).toBe(appHealthMockAuthorizationInterfaceData[0]);
        });
    });
});
