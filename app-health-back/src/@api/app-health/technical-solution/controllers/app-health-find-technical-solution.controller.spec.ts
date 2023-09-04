import { AppHealthFindTechnicalSolutionController, AppHealthFindTechnicalSolutionHandler } from '@api/app-health/technical-solution';
import { appHealthMockTechnicalSolutionData } from '@app/app-health/technical-solution';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindTechnicalSolutionController', () =>
{
    let controller: AppHealthFindTechnicalSolutionController;
    let handler: AppHealthFindTechnicalSolutionHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthFindTechnicalSolutionController,
            ],
            providers: [
                {
                    provide : AppHealthFindTechnicalSolutionHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthFindTechnicalSolutionController>(AppHealthFindTechnicalSolutionController);
        handler = module.get<AppHealthFindTechnicalSolutionHandler>(AppHealthFindTechnicalSolutionHandler);
    });

    describe('main', () =>
    {
        test('AppHealthFindTechnicalSolutionController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a technicalSolution', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockTechnicalSolutionData[0])));
            expect(await controller.main()).toBe(appHealthMockTechnicalSolutionData[0]);
        });
    });
});
