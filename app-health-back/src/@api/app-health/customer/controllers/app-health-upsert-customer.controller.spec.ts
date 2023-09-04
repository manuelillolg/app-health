import { AppHealthUpsertCustomerController, AppHealthUpsertCustomerHandler } from '@api/app-health/customer';
import { appHealthMockCustomerData } from '@app/app-health/customer';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpsertCustomerController', () =>
{
    let controller: AppHealthUpsertCustomerController;
    let handler: AppHealthUpsertCustomerHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthUpsertCustomerController,
            ],
            providers: [
                {
                    provide : AppHealthUpsertCustomerHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthUpsertCustomerController>(AppHealthUpsertCustomerController);
        handler = module.get<AppHealthUpsertCustomerHandler>(AppHealthUpsertCustomerHandler);
    });

    describe('main', () =>
    {
        test('AppHealthUpsertCustomerController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an customer upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockCustomerData[0])));
            expect(await controller.main(appHealthMockCustomerData[0])).toBe(appHealthMockCustomerData[0]);
        });
    });
});
