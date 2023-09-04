import { AppHealthUpdateCustomersController, AppHealthUpdateCustomersHandler } from '@api/app-health/customer';
import { appHealthMockCustomerData } from '@app/app-health/customer';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateCustomersController', () =>
{
    let controller: AppHealthUpdateCustomersController;
    let handler: AppHealthUpdateCustomersHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthUpdateCustomersController,
            ],
            providers: [
                {
                    provide : AppHealthUpdateCustomersHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthUpdateCustomersController>(AppHealthUpdateCustomersController);
        handler = module.get<AppHealthUpdateCustomersHandler>(AppHealthUpdateCustomersHandler);
    });

    describe('main', () =>
    {
        test('AppHealthUpdateCustomersController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a customers updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockCustomerData[0])));
            expect(await controller.main(appHealthMockCustomerData[0])).toBe(appHealthMockCustomerData[0]);
        });
    });
});
