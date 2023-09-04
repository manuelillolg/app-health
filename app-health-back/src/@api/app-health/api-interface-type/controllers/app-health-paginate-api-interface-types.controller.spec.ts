import { AppHealthPaginateApiInterfaceTypesController, AppHealthPaginateApiInterfaceTypesHandler } from '@api/app-health/api-interface-type';
import { appHealthMockApiInterfaceTypeData } from '@app/app-health/api-interface-type';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthPaginateApiInterfaceTypesController', () =>
{
    let controller: AppHealthPaginateApiInterfaceTypesController;
    let handler: AppHealthPaginateApiInterfaceTypesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthPaginateApiInterfaceTypesController,
            ],
            providers: [
                {
                    provide : AppHealthPaginateApiInterfaceTypesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthPaginateApiInterfaceTypesController>(AppHealthPaginateApiInterfaceTypesController);
        handler = module.get<AppHealthPaginateApiInterfaceTypesHandler>(AppHealthPaginateApiInterfaceTypesHandler);
    });

    describe('main', () =>
    {
        test('AppHealthPaginateApiInterfaceTypesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a appHealthMockApiInterfaceTypeData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : appHealthMockApiInterfaceTypeData,
            })));
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : appHealthMockApiInterfaceTypeData,
            });
        });
    });
});
