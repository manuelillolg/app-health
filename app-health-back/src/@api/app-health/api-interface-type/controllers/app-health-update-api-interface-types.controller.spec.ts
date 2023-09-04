import { AppHealthUpdateApiInterfaceTypesController, AppHealthUpdateApiInterfaceTypesHandler } from '@api/app-health/api-interface-type';
import { appHealthMockApiInterfaceTypeData } from '@app/app-health/api-interface-type';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateApiInterfaceTypesController', () =>
{
    let controller: AppHealthUpdateApiInterfaceTypesController;
    let handler: AppHealthUpdateApiInterfaceTypesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthUpdateApiInterfaceTypesController,
            ],
            providers: [
                {
                    provide : AppHealthUpdateApiInterfaceTypesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthUpdateApiInterfaceTypesController>(AppHealthUpdateApiInterfaceTypesController);
        handler = module.get<AppHealthUpdateApiInterfaceTypesHandler>(AppHealthUpdateApiInterfaceTypesHandler);
    });

    describe('main', () =>
    {
        test('AppHealthUpdateApiInterfaceTypesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a apiInterfaceTypes updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApiInterfaceTypeData[0])));
            expect(await controller.main(appHealthMockApiInterfaceTypeData[0])).toBe(appHealthMockApiInterfaceTypeData[0]);
        });
    });
});
