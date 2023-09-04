import { AppHealthFindTechnicalSolutionByIdController, AppHealthFindTechnicalSolutionByIdHandler } from '@api/app-health/technical-solution';
import { appHealthMockTechnicalSolutionData } from '@app/app-health/technical-solution';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindTechnicalSolutionByIdController', () =>
{
    let controller: AppHealthFindTechnicalSolutionByIdController;
    let handler: AppHealthFindTechnicalSolutionByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthFindTechnicalSolutionByIdController,
            ],
            providers: [
                {
                    provide : AppHealthFindTechnicalSolutionByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthFindTechnicalSolutionByIdController>(AppHealthFindTechnicalSolutionByIdController);
        handler = module.get<AppHealthFindTechnicalSolutionByIdHandler>(AppHealthFindTechnicalSolutionByIdHandler);
    });

    describe('main', () =>
    {
        test('AppHealthFindTechnicalSolutionByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an technicalSolution by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockTechnicalSolutionData[0])));
            expect(await controller.main(appHealthMockTechnicalSolutionData[0].id)).toBe(appHealthMockTechnicalSolutionData[0]);
        });
    });
});
