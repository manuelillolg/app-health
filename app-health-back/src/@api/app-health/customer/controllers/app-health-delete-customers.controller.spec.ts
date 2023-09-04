import { AppHealthDeleteCustomersController, AppHealthDeleteCustomersHandler } from '@api/app-health/customer';
import { appHealthMockCustomerData } from '@app/app-health/customer';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteCustomersController', () =>
{
    let controller: AppHealthDeleteCustomersController;
    let handler: AppHealthDeleteCustomersHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthDeleteCustomersController,
            ],
            providers: [
                {
                    provide : AppHealthDeleteCustomersHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthDeleteCustomersController>(AppHealthDeleteCustomersController);
        handler = module.get<AppHealthDeleteCustomersHandler>(AppHealthDeleteCustomersHandler);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteCustomersController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an appHealthMockCustomerData deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockCustomerData)));
            expect(await controller.main()).toBe(appHealthMockCustomerData);
        });
    });
});
