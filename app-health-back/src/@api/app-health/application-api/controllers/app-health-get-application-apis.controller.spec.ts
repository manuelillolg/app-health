import { AppHealthGetApplicationApisController, AppHealthGetApplicationApisHandler } from '@api/app-health/application-api';
import { appHealthMockApplicationApiData } from '@app/app-health/application-api';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthGetApplicationApisController', () =>
{
    let controller: AppHealthGetApplicationApisController;
    let handler: AppHealthGetApplicationApisHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthGetApplicationApisController,
            ],
            providers: [
                {
                    provide : AppHealthGetApplicationApisHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthGetApplicationApisController>(AppHealthGetApplicationApisController);
        handler = module.get<AppHealthGetApplicationApisHandler>(AppHealthGetApplicationApisHandler);
    });

    describe('main', () =>
    {
        test('AppHealthGetApplicationApisController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a appHealthMockApplicationApiData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationApiData)));
            expect(await controller.main()).toBe(appHealthMockApplicationApiData);
        });
    });
});
