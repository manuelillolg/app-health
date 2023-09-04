import { AppHealthDeleteTechnicalSolutionsController, AppHealthDeleteTechnicalSolutionsHandler } from '@api/app-health/technical-solution';
import { appHealthMockTechnicalSolutionData } from '@app/app-health/technical-solution';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteTechnicalSolutionsController', () =>
{
    let controller: AppHealthDeleteTechnicalSolutionsController;
    let handler: AppHealthDeleteTechnicalSolutionsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthDeleteTechnicalSolutionsController,
            ],
            providers: [
                {
                    provide : AppHealthDeleteTechnicalSolutionsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthDeleteTechnicalSolutionsController>(AppHealthDeleteTechnicalSolutionsController);
        handler = module.get<AppHealthDeleteTechnicalSolutionsHandler>(AppHealthDeleteTechnicalSolutionsHandler);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteTechnicalSolutionsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an appHealthMockTechnicalSolutionData deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockTechnicalSolutionData)));
            expect(await controller.main()).toBe(appHealthMockTechnicalSolutionData);
        });
    });
});
