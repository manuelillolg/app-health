/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthDeleteApiInterfaceTypeByIdController, AppHealthDeleteApiInterfaceTypeByIdHandler } from '@api/app-health/api-interface-type';
import { appHealthMockApiInterfaceTypeData } from '@app/app-health/api-interface-type';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteApiInterfaceTypeByIdController', () =>
{
    let controller: AppHealthDeleteApiInterfaceTypeByIdController;
    let handler: AppHealthDeleteApiInterfaceTypeByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthDeleteApiInterfaceTypeByIdController,
            ],
            providers: [
                {
                    provide : AppHealthDeleteApiInterfaceTypeByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthDeleteApiInterfaceTypeByIdController>(AppHealthDeleteApiInterfaceTypeByIdController);
        handler = module.get<AppHealthDeleteApiInterfaceTypeByIdHandler>(AppHealthDeleteApiInterfaceTypeByIdHandler);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteApiInterfaceTypeByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an apiInterfaceType deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApiInterfaceTypeData[0])));
            expect(await controller.main(appHealthMockApiInterfaceTypeData[0].id)).toBe(appHealthMockApiInterfaceTypeData[0]);
        });
    });
});
