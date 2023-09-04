import { AppHealthUpdateTechnicalSolutionByIdController, AppHealthUpdateTechnicalSolutionByIdHandler } from '@api/app-health/technical-solution';
import { appHealthMockTechnicalSolutionData } from '@app/app-health/technical-solution';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateTechnicalSolutionByIdController', () =>
{
    let controller: AppHealthUpdateTechnicalSolutionByIdController;
    let handler: AppHealthUpdateTechnicalSolutionByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthUpdateTechnicalSolutionByIdController,
            ],
            providers: [
                {
                    provide : AppHealthUpdateTechnicalSolutionByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthUpdateTechnicalSolutionByIdController>(AppHealthUpdateTechnicalSolutionByIdController);
        handler = module.get<AppHealthUpdateTechnicalSolutionByIdHandler>(AppHealthUpdateTechnicalSolutionByIdHandler);
    });

    describe('main', () =>
    {
        test('AppHealthUpdateTechnicalSolutionByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a technicalSolution updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockTechnicalSolutionData[0])));
            expect(await controller.main(appHealthMockTechnicalSolutionData[0])).toBe(appHealthMockTechnicalSolutionData[0]);
        });
    });
});
