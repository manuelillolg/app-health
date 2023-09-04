import { AppHealthCreateApplicationApiController, AppHealthCreateApplicationApiHandler } from '@api/app-health/application-api';
import { appHealthMockApplicationApiData } from '@app/app-health/application-api';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateApplicationApiController', () =>
{
    let controller: AppHealthCreateApplicationApiController;
    let handler: AppHealthCreateApplicationApiHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthCreateApplicationApiController,
            ],
            providers: [
                {
                    provide : AppHealthCreateApplicationApiHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthCreateApplicationApiController>(AppHealthCreateApplicationApiController);
        handler = module.get<AppHealthCreateApplicationApiHandler>(AppHealthCreateApplicationApiHandler);
    });

    describe('main', () =>
    {
        test('AppHealthCreateApplicationApiController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an applicationApi created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationApiData[0])));
            expect(
                await controller.main(
                    appHealthMockApplicationApiData[0],
                ),
            )
                .toBe(appHealthMockApplicationApiData[0]);
        });
    });
});
