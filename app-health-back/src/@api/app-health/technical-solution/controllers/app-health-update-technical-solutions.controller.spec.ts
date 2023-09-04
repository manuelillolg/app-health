import { AppHealthUpdateTechnicalSolutionsController, AppHealthUpdateTechnicalSolutionsHandler } from '@api/app-health/technical-solution';
import { appHealthMockTechnicalSolutionData } from '@app/app-health/technical-solution';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateTechnicalSolutionsController', () =>
{
    let controller: AppHealthUpdateTechnicalSolutionsController;
    let handler: AppHealthUpdateTechnicalSolutionsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthUpdateTechnicalSolutionsController,
            ],
            providers: [
                {
                    provide : AppHealthUpdateTechnicalSolutionsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthUpdateTechnicalSolutionsController>(AppHealthUpdateTechnicalSolutionsController);
        handler = module.get<AppHealthUpdateTechnicalSolutionsHandler>(AppHealthUpdateTechnicalSolutionsHandler);
    });

    describe('main', () =>
    {
        test('AppHealthUpdateTechnicalSolutionsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a technicalSolutions updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockTechnicalSolutionData[0])));
            expect(await controller.main(appHealthMockTechnicalSolutionData[0])).toBe(appHealthMockTechnicalSolutionData[0]);
        });
    });
});
