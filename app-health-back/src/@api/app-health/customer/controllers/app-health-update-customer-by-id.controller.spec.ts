import { AppHealthUpdateCustomerByIdController, AppHealthUpdateCustomerByIdHandler } from '@api/app-health/customer';
import { appHealthMockCustomerData } from '@app/app-health/customer';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateCustomerByIdController', () =>
{
    let controller: AppHealthUpdateCustomerByIdController;
    let handler: AppHealthUpdateCustomerByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthUpdateCustomerByIdController,
            ],
            providers: [
                {
                    provide : AppHealthUpdateCustomerByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthUpdateCustomerByIdController>(AppHealthUpdateCustomerByIdController);
        handler = module.get<AppHealthUpdateCustomerByIdHandler>(AppHealthUpdateCustomerByIdHandler);
    });

    describe('main', () =>
    {
        test('AppHealthUpdateCustomerByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a customer updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockCustomerData[0])));
            expect(await controller.main(appHealthMockCustomerData[0])).toBe(appHealthMockCustomerData[0]);
        });
    });
});
