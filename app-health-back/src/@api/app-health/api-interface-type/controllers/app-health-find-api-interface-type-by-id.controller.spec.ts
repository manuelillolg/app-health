import { AppHealthFindApiInterfaceTypeByIdController, AppHealthFindApiInterfaceTypeByIdHandler } from '@api/app-health/api-interface-type';
import { appHealthMockApiInterfaceTypeData } from '@app/app-health/api-interface-type';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindApiInterfaceTypeByIdController', () =>
{
    let controller: AppHealthFindApiInterfaceTypeByIdController;
    let handler: AppHealthFindApiInterfaceTypeByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthFindApiInterfaceTypeByIdController,
            ],
            providers: [
                {
                    provide : AppHealthFindApiInterfaceTypeByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthFindApiInterfaceTypeByIdController>(AppHealthFindApiInterfaceTypeByIdController);
        handler = module.get<AppHealthFindApiInterfaceTypeByIdHandler>(AppHealthFindApiInterfaceTypeByIdHandler);
    });

    describe('main', () =>
    {
        test('AppHealthFindApiInterfaceTypeByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an apiInterfaceType by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApiInterfaceTypeData[0])));
            expect(await controller.main(appHealthMockApiInterfaceTypeData[0].id)).toBe(appHealthMockApiInterfaceTypeData[0]);
        });
    });
});
