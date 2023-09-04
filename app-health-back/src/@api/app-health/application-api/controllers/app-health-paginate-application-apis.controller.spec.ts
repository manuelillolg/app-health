import { AppHealthPaginateApplicationApisController, AppHealthPaginateApplicationApisHandler } from '@api/app-health/application-api';
import { appHealthMockApplicationApiData } from '@app/app-health/application-api';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthPaginateApplicationApisController', () =>
{
    let controller: AppHealthPaginateApplicationApisController;
    let handler: AppHealthPaginateApplicationApisHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthPaginateApplicationApisController,
            ],
            providers: [
                {
                    provide : AppHealthPaginateApplicationApisHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthPaginateApplicationApisController>(AppHealthPaginateApplicationApisController);
        handler = module.get<AppHealthPaginateApplicationApisHandler>(AppHealthPaginateApplicationApisHandler);
    });

    describe('main', () =>
    {
        test('AppHealthPaginateApplicationApisController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a appHealthMockApplicationApiData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : appHealthMockApplicationApiData,
            })));
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : appHealthMockApplicationApiData,
            });
        });
    });
});
