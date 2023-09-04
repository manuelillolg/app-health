import { AppHealthPaginateCustomersController, AppHealthPaginateCustomersHandler } from '@api/app-health/customer';
import { appHealthMockCustomerData } from '@app/app-health/customer';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthPaginateCustomersController', () =>
{
    let controller: AppHealthPaginateCustomersController;
    let handler: AppHealthPaginateCustomersHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthPaginateCustomersController,
            ],
            providers: [
                {
                    provide : AppHealthPaginateCustomersHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthPaginateCustomersController>(AppHealthPaginateCustomersController);
        handler = module.get<AppHealthPaginateCustomersHandler>(AppHealthPaginateCustomersHandler);
    });

    describe('main', () =>
    {
        test('AppHealthPaginateCustomersController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a appHealthMockCustomerData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : appHealthMockCustomerData,
            })));
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : appHealthMockCustomerData,
            });
        });
    });
});
