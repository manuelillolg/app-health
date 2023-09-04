import { AppHealthUpdateApiInterfaceTypeByIdController, AppHealthUpdateApiInterfaceTypeByIdHandler } from '@api/app-health/api-interface-type';
import { appHealthMockApiInterfaceTypeData } from '@app/app-health/api-interface-type';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateApiInterfaceTypeByIdController', () =>
{
    let controller: AppHealthUpdateApiInterfaceTypeByIdController;
    let handler: AppHealthUpdateApiInterfaceTypeByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthUpdateApiInterfaceTypeByIdController,
            ],
            providers: [
                {
                    provide : AppHealthUpdateApiInterfaceTypeByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthUpdateApiInterfaceTypeByIdController>(AppHealthUpdateApiInterfaceTypeByIdController);
        handler = module.get<AppHealthUpdateApiInterfaceTypeByIdHandler>(AppHealthUpdateApiInterfaceTypeByIdHandler);
    });

    describe('main', () =>
    {
        test('AppHealthUpdateApiInterfaceTypeByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a apiInterfaceType updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApiInterfaceTypeData[0])));
            expect(await controller.main(appHealthMockApiInterfaceTypeData[0])).toBe(appHealthMockApiInterfaceTypeData[0]);
        });
    });
});
