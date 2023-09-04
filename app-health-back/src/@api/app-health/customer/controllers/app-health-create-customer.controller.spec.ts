import { AppHealthCreateCustomerController, AppHealthCreateCustomerHandler } from '@api/app-health/customer';
import { appHealthMockCustomerData } from '@app/app-health/customer';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateCustomerController', () =>
{
    let controller: AppHealthCreateCustomerController;
    let handler: AppHealthCreateCustomerHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthCreateCustomerController,
            ],
            providers: [
                {
                    provide : AppHealthCreateCustomerHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthCreateCustomerController>(AppHealthCreateCustomerController);
        handler = module.get<AppHealthCreateCustomerHandler>(AppHealthCreateCustomerHandler);
    });

    describe('main', () =>
    {
        test('AppHealthCreateCustomerController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an customer created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockCustomerData[0])));
            expect(
                await controller.main(
                    appHealthMockCustomerData[0],
                ),
            )
                .toBe(appHealthMockCustomerData[0]);
        });
    });
});
