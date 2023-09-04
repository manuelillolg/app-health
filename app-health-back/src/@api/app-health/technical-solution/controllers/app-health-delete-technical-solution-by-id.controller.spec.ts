/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthDeleteTechnicalSolutionByIdController, AppHealthDeleteTechnicalSolutionByIdHandler } from '@api/app-health/technical-solution';
import { appHealthMockTechnicalSolutionData } from '@app/app-health/technical-solution';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteTechnicalSolutionByIdController', () =>
{
    let controller: AppHealthDeleteTechnicalSolutionByIdController;
    let handler: AppHealthDeleteTechnicalSolutionByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthDeleteTechnicalSolutionByIdController,
            ],
            providers: [
                {
                    provide : AppHealthDeleteTechnicalSolutionByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthDeleteTechnicalSolutionByIdController>(AppHealthDeleteTechnicalSolutionByIdController);
        handler = module.get<AppHealthDeleteTechnicalSolutionByIdHandler>(AppHealthDeleteTechnicalSolutionByIdHandler);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteTechnicalSolutionByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an technicalSolution deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockTechnicalSolutionData[0])));
            expect(await controller.main(appHealthMockTechnicalSolutionData[0].id)).toBe(appHealthMockTechnicalSolutionData[0]);
        });
    });
});
