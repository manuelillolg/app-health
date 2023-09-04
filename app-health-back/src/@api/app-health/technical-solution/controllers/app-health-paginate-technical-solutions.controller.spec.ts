import { AppHealthPaginateTechnicalSolutionsController, AppHealthPaginateTechnicalSolutionsHandler } from '@api/app-health/technical-solution';
import { appHealthMockTechnicalSolutionData } from '@app/app-health/technical-solution';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthPaginateTechnicalSolutionsController', () =>
{
    let controller: AppHealthPaginateTechnicalSolutionsController;
    let handler: AppHealthPaginateTechnicalSolutionsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthPaginateTechnicalSolutionsController,
            ],
            providers: [
                {
                    provide : AppHealthPaginateTechnicalSolutionsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthPaginateTechnicalSolutionsController>(AppHealthPaginateTechnicalSolutionsController);
        handler = module.get<AppHealthPaginateTechnicalSolutionsHandler>(AppHealthPaginateTechnicalSolutionsHandler);
    });

    describe('main', () =>
    {
        test('AppHealthPaginateTechnicalSolutionsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a appHealthMockTechnicalSolutionData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : appHealthMockTechnicalSolutionData,
            })));
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : appHealthMockTechnicalSolutionData,
            });
        });
    });
});
