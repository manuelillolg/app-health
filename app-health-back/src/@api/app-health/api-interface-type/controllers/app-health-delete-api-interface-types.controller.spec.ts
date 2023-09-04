import { AppHealthDeleteApiInterfaceTypesController, AppHealthDeleteApiInterfaceTypesHandler } from '@api/app-health/api-interface-type';
import { appHealthMockApiInterfaceTypeData } from '@app/app-health/api-interface-type';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteApiInterfaceTypesController', () =>
{
    let controller: AppHealthDeleteApiInterfaceTypesController;
    let handler: AppHealthDeleteApiInterfaceTypesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthDeleteApiInterfaceTypesController,
            ],
            providers: [
                {
                    provide : AppHealthDeleteApiInterfaceTypesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthDeleteApiInterfaceTypesController>(AppHealthDeleteApiInterfaceTypesController);
        handler = module.get<AppHealthDeleteApiInterfaceTypesHandler>(AppHealthDeleteApiInterfaceTypesHandler);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteApiInterfaceTypesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an appHealthMockApiInterfaceTypeData deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApiInterfaceTypeData)));
            expect(await controller.main()).toBe(appHealthMockApiInterfaceTypeData);
        });
    });
});
