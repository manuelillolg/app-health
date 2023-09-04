import { AppHealthUpdateAuthenticationInterfaceByIdController, AppHealthUpdateAuthenticationInterfaceByIdHandler } from '@api/app-health/authentication-interface';
import { appHealthMockAuthenticationInterfaceData } from '@app/app-health/authentication-interface';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateAuthenticationInterfaceByIdController', () =>
{
    let controller: AppHealthUpdateAuthenticationInterfaceByIdController;
    let handler: AppHealthUpdateAuthenticationInterfaceByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthUpdateAuthenticationInterfaceByIdController,
            ],
            providers: [
                {
                    provide : AppHealthUpdateAuthenticationInterfaceByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthUpdateAuthenticationInterfaceByIdController>(AppHealthUpdateAuthenticationInterfaceByIdController);
        handler = module.get<AppHealthUpdateAuthenticationInterfaceByIdHandler>(AppHealthUpdateAuthenticationInterfaceByIdHandler);
    });

    describe('main', () =>
    {
        test('AppHealthUpdateAuthenticationInterfaceByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a authenticationInterface updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockAuthenticationInterfaceData[0])));
            expect(await controller.main(appHealthMockAuthenticationInterfaceData[0])).toBe(appHealthMockAuthenticationInterfaceData[0]);
        });
    });
});
