import { AppHealthFindCustomerByIdController, AppHealthFindCustomerByIdHandler } from '@api/app-health/customer';
import { appHealthMockCustomerData } from '@app/app-health/customer';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindCustomerByIdController', () =>
{
    let controller: AppHealthFindCustomerByIdController;
    let handler: AppHealthFindCustomerByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthFindCustomerByIdController,
            ],
            providers: [
                {
                    provide : AppHealthFindCustomerByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthFindCustomerByIdController>(AppHealthFindCustomerByIdController);
        handler = module.get<AppHealthFindCustomerByIdHandler>(AppHealthFindCustomerByIdHandler);
    });

    describe('main', () =>
    {
        test('AppHealthFindCustomerByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an customer by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockCustomerData[0])));
            expect(await controller.main(appHealthMockCustomerData[0].id)).toBe(appHealthMockCustomerData[0]);
        });
    });
});
