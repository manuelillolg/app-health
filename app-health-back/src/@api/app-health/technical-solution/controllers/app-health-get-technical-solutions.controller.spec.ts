import { AppHealthGetTechnicalSolutionsController, AppHealthGetTechnicalSolutionsHandler } from '@api/app-health/technical-solution';
import { appHealthMockTechnicalSolutionData } from '@app/app-health/technical-solution';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthGetTechnicalSolutionsController', () =>
{
    let controller: AppHealthGetTechnicalSolutionsController;
    let handler: AppHealthGetTechnicalSolutionsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthGetTechnicalSolutionsController,
            ],
            providers: [
                {
                    provide : AppHealthGetTechnicalSolutionsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthGetTechnicalSolutionsController>(AppHealthGetTechnicalSolutionsController);
        handler = module.get<AppHealthGetTechnicalSolutionsHandler>(AppHealthGetTechnicalSolutionsHandler);
    });

    describe('main', () =>
    {
        test('AppHealthGetTechnicalSolutionsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a appHealthMockTechnicalSolutionData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockTechnicalSolutionData)));
            expect(await controller.main()).toBe(appHealthMockTechnicalSolutionData);
        });
    });
});
