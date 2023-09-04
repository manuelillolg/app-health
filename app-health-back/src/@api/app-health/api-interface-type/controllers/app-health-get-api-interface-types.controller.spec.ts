import { AppHealthGetApiInterfaceTypesController, AppHealthGetApiInterfaceTypesHandler } from '@api/app-health/api-interface-type';
import { appHealthMockApiInterfaceTypeData } from '@app/app-health/api-interface-type';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthGetApiInterfaceTypesController', () =>
{
    let controller: AppHealthGetApiInterfaceTypesController;
    let handler: AppHealthGetApiInterfaceTypesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthGetApiInterfaceTypesController,
            ],
            providers: [
                {
                    provide : AppHealthGetApiInterfaceTypesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthGetApiInterfaceTypesController>(AppHealthGetApiInterfaceTypesController);
        handler = module.get<AppHealthGetApiInterfaceTypesHandler>(AppHealthGetApiInterfaceTypesHandler);
    });

    describe('main', () =>
    {
        test('AppHealthGetApiInterfaceTypesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a appHealthMockApiInterfaceTypeData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApiInterfaceTypeData)));
            expect(await controller.main()).toBe(appHealthMockApiInterfaceTypeData);
        });
    });
});
