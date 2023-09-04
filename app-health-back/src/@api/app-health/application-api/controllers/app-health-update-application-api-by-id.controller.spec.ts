import { AppHealthUpdateApplicationApiByIdController, AppHealthUpdateApplicationApiByIdHandler } from '@api/app-health/application-api';
import { appHealthMockApplicationApiData } from '@app/app-health/application-api';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateApplicationApiByIdController', () =>
{
    let controller: AppHealthUpdateApplicationApiByIdController;
    let handler: AppHealthUpdateApplicationApiByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthUpdateApplicationApiByIdController,
            ],
            providers: [
                {
                    provide : AppHealthUpdateApplicationApiByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthUpdateApplicationApiByIdController>(AppHealthUpdateApplicationApiByIdController);
        handler = module.get<AppHealthUpdateApplicationApiByIdHandler>(AppHealthUpdateApplicationApiByIdHandler);
    });

    describe('main', () =>
    {
        test('AppHealthUpdateApplicationApiByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a applicationApi updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationApiData[0])));
            expect(await controller.main(appHealthMockApplicationApiData[0])).toBe(appHealthMockApplicationApiData[0]);
        });
    });
});
