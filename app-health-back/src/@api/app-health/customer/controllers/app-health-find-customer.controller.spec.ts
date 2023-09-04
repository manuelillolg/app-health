import { AppHealthFindCustomerController, AppHealthFindCustomerHandler } from '@api/app-health/customer';
import { appHealthMockCustomerData } from '@app/app-health/customer';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindCustomerController', () =>
{
    let controller: AppHealthFindCustomerController;
    let handler: AppHealthFindCustomerHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthFindCustomerController,
            ],
            providers: [
                {
                    provide : AppHealthFindCustomerHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthFindCustomerController>(AppHealthFindCustomerController);
        handler = module.get<AppHealthFindCustomerHandler>(AppHealthFindCustomerHandler);
    });

    describe('main', () =>
    {
        test('AppHealthFindCustomerController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a customer', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockCustomerData[0])));
            expect(await controller.main()).toBe(appHealthMockCustomerData[0]);
        });
    });
});
