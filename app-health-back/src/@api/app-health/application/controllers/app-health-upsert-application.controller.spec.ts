import { AppHealthUpsertApplicationController, AppHealthUpsertApplicationHandler } from '@api/app-health/application';
import { appHealthMockApplicationData } from '@app/app-health/application';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpsertApplicationController', () =>
{
    let controller: AppHealthUpsertApplicationController;
    let handler: AppHealthUpsertApplicationHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthUpsertApplicationController,
            ],
            providers: [
                {
                    provide : AppHealthUpsertApplicationHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthUpsertApplicationController>(AppHealthUpsertApplicationController);
        handler = module.get<AppHealthUpsertApplicationHandler>(AppHealthUpsertApplicationHandler);
    });

    describe('main', () =>
    {
        test('AppHealthUpsertApplicationController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an application upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationData[0])));
            expect(await controller.main(appHealthMockApplicationData[0])).toBe(appHealthMockApplicationData[0]);
        });
    });
});
