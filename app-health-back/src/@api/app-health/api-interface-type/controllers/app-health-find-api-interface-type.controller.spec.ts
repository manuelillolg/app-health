import { AppHealthFindApiInterfaceTypeController, AppHealthFindApiInterfaceTypeHandler } from '@api/app-health/api-interface-type';
import { appHealthMockApiInterfaceTypeData } from '@app/app-health/api-interface-type';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindApiInterfaceTypeController', () =>
{
    let controller: AppHealthFindApiInterfaceTypeController;
    let handler: AppHealthFindApiInterfaceTypeHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthFindApiInterfaceTypeController,
            ],
            providers: [
                {
                    provide : AppHealthFindApiInterfaceTypeHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthFindApiInterfaceTypeController>(AppHealthFindApiInterfaceTypeController);
        handler = module.get<AppHealthFindApiInterfaceTypeHandler>(AppHealthFindApiInterfaceTypeHandler);
    });

    describe('main', () =>
    {
        test('AppHealthFindApiInterfaceTypeController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a apiInterfaceType', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApiInterfaceTypeData[0])));
            expect(await controller.main()).toBe(appHealthMockApiInterfaceTypeData[0]);
        });
    });
});
