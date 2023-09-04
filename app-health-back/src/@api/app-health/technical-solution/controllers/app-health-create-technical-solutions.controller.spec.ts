import { AppHealthCreateTechnicalSolutionsController, AppHealthCreateTechnicalSolutionsHandler } from '@api/app-health/technical-solution';
import { appHealthMockTechnicalSolutionData } from '@app/app-health/technical-solution';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateTechnicalSolutionsController', () =>
{
    let controller: AppHealthCreateTechnicalSolutionsController;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                AppHealthCreateTechnicalSolutionsController,
            ],
            providers: [
                {
                    provide : AppHealthCreateTechnicalSolutionsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthCreateTechnicalSolutionsController>(AppHealthCreateTechnicalSolutionsController);
    });

    describe('main', () =>
    {
        test('AppHealthCreateTechnicalSolutionsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an appHealthMockTechnicalSolutionData created', async () =>
        {
            expect(
                await controller.main(
                    appHealthMockTechnicalSolutionData,
                ),
            )
                .toBe(undefined);
        });
    });
});
