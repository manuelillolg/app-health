import { AppHealthCreateCustomersController, AppHealthCreateCustomersHandler } from '@api/app-health/customer';
import { appHealthMockCustomerData } from '@app/app-health/customer';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateCustomersController', () =>
{
    let controller: AppHealthCreateCustomersController;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                AppHealthCreateCustomersController,
            ],
            providers: [
                {
                    provide : AppHealthCreateCustomersHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthCreateCustomersController>(AppHealthCreateCustomersController);
    });

    describe('main', () =>
    {
        test('AppHealthCreateCustomersController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an appHealthMockCustomerData created', async () =>
        {
            expect(
                await controller.main(
                    appHealthMockCustomerData,
                ),
            )
                .toBe(undefined);
        });
    });
});
