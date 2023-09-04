/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthDeleteCustomerByIdController, AppHealthDeleteCustomerByIdHandler } from '@api/app-health/customer';
import { appHealthMockCustomerData } from '@app/app-health/customer';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteCustomerByIdController', () =>
{
    let controller: AppHealthDeleteCustomerByIdController;
    let handler: AppHealthDeleteCustomerByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthDeleteCustomerByIdController,
            ],
            providers: [
                {
                    provide : AppHealthDeleteCustomerByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthDeleteCustomerByIdController>(AppHealthDeleteCustomerByIdController);
        handler = module.get<AppHealthDeleteCustomerByIdHandler>(AppHealthDeleteCustomerByIdHandler);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteCustomerByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an customer deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockCustomerData[0])));
            expect(await controller.main(appHealthMockCustomerData[0].id)).toBe(appHealthMockCustomerData[0]);
        });
    });
});
