import { AppHealthGetCustomersController, AppHealthGetCustomersHandler } from '@api/app-health/customer';
import { appHealthMockCustomerData } from '@app/app-health/customer';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthGetCustomersController', () =>
{
    let controller: AppHealthGetCustomersController;
    let handler: AppHealthGetCustomersHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthGetCustomersController,
            ],
            providers: [
                {
                    provide : AppHealthGetCustomersHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthGetCustomersController>(AppHealthGetCustomersController);
        handler = module.get<AppHealthGetCustomersHandler>(AppHealthGetCustomersHandler);
    });

    describe('main', () =>
    {
        test('AppHealthGetCustomersController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a appHealthMockCustomerData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockCustomerData)));
            expect(await controller.main()).toBe(appHealthMockCustomerData);
        });
    });
});
