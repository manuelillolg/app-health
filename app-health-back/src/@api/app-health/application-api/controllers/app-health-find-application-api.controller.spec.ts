import { AppHealthFindApplicationApiController, AppHealthFindApplicationApiHandler } from '@api/app-health/application-api';
import { appHealthMockApplicationApiData } from '@app/app-health/application-api';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindApplicationApiController', () =>
{
    let controller: AppHealthFindApplicationApiController;
    let handler: AppHealthFindApplicationApiHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthFindApplicationApiController,
            ],
            providers: [
                {
                    provide : AppHealthFindApplicationApiHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthFindApplicationApiController>(AppHealthFindApplicationApiController);
        handler = module.get<AppHealthFindApplicationApiHandler>(AppHealthFindApplicationApiHandler);
    });

    describe('main', () =>
    {
        test('AppHealthFindApplicationApiController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a applicationApi', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationApiData[0])));
            expect(await controller.main()).toBe(appHealthMockApplicationApiData[0]);
        });
    });
});
