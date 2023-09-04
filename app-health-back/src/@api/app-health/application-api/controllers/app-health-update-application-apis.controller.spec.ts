import { AppHealthUpdateApplicationApisController, AppHealthUpdateApplicationApisHandler } from '@api/app-health/application-api';
import { appHealthMockApplicationApiData } from '@app/app-health/application-api';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateApplicationApisController', () =>
{
    let controller: AppHealthUpdateApplicationApisController;
    let handler: AppHealthUpdateApplicationApisHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthUpdateApplicationApisController,
            ],
            providers: [
                {
                    provide : AppHealthUpdateApplicationApisHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthUpdateApplicationApisController>(AppHealthUpdateApplicationApisController);
        handler = module.get<AppHealthUpdateApplicationApisHandler>(AppHealthUpdateApplicationApisHandler);
    });

    describe('main', () =>
    {
        test('AppHealthUpdateApplicationApisController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a applicationApis updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationApiData[0])));
            expect(await controller.main(appHealthMockApplicationApiData[0])).toBe(appHealthMockApplicationApiData[0]);
        });
    });
});
