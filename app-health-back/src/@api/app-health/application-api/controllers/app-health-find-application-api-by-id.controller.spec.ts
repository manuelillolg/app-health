import { AppHealthFindApplicationApiByIdController, AppHealthFindApplicationApiByIdHandler } from '@api/app-health/application-api';
import { appHealthMockApplicationApiData } from '@app/app-health/application-api';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindApplicationApiByIdController', () =>
{
    let controller: AppHealthFindApplicationApiByIdController;
    let handler: AppHealthFindApplicationApiByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthFindApplicationApiByIdController,
            ],
            providers: [
                {
                    provide : AppHealthFindApplicationApiByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthFindApplicationApiByIdController>(AppHealthFindApplicationApiByIdController);
        handler = module.get<AppHealthFindApplicationApiByIdHandler>(AppHealthFindApplicationApiByIdHandler);
    });

    describe('main', () =>
    {
        test('AppHealthFindApplicationApiByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an applicationApi by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationApiData[0])));
            expect(await controller.main(appHealthMockApplicationApiData[0].id)).toBe(appHealthMockApplicationApiData[0]);
        });
    });
});
