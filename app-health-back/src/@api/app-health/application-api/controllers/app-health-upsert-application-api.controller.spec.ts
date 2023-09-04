import { AppHealthUpsertApplicationApiController, AppHealthUpsertApplicationApiHandler } from '@api/app-health/application-api';
import { appHealthMockApplicationApiData } from '@app/app-health/application-api';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpsertApplicationApiController', () =>
{
    let controller: AppHealthUpsertApplicationApiController;
    let handler: AppHealthUpsertApplicationApiHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthUpsertApplicationApiController,
            ],
            providers: [
                {
                    provide : AppHealthUpsertApplicationApiHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthUpsertApplicationApiController>(AppHealthUpsertApplicationApiController);
        handler = module.get<AppHealthUpsertApplicationApiHandler>(AppHealthUpsertApplicationApiHandler);
    });

    describe('main', () =>
    {
        test('AppHealthUpsertApplicationApiController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an applicationApi upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationApiData[0])));
            expect(await controller.main(appHealthMockApplicationApiData[0])).toBe(appHealthMockApplicationApiData[0]);
        });
    });
});
