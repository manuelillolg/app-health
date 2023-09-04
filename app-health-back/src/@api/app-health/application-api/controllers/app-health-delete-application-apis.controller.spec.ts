import { AppHealthDeleteApplicationApisController, AppHealthDeleteApplicationApisHandler } from '@api/app-health/application-api';
import { appHealthMockApplicationApiData } from '@app/app-health/application-api';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteApplicationApisController', () =>
{
    let controller: AppHealthDeleteApplicationApisController;
    let handler: AppHealthDeleteApplicationApisHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthDeleteApplicationApisController,
            ],
            providers: [
                {
                    provide : AppHealthDeleteApplicationApisHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthDeleteApplicationApisController>(AppHealthDeleteApplicationApisController);
        handler = module.get<AppHealthDeleteApplicationApisHandler>(AppHealthDeleteApplicationApisHandler);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteApplicationApisController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an appHealthMockApplicationApiData deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationApiData)));
            expect(await controller.main()).toBe(appHealthMockApplicationApiData);
        });
    });
});
