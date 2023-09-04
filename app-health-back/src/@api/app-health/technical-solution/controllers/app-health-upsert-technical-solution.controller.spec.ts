import { AppHealthUpsertTechnicalSolutionController, AppHealthUpsertTechnicalSolutionHandler } from '@api/app-health/technical-solution';
import { appHealthMockTechnicalSolutionData } from '@app/app-health/technical-solution';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpsertTechnicalSolutionController', () =>
{
    let controller: AppHealthUpsertTechnicalSolutionController;
    let handler: AppHealthUpsertTechnicalSolutionHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthUpsertTechnicalSolutionController,
            ],
            providers: [
                {
                    provide : AppHealthUpsertTechnicalSolutionHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthUpsertTechnicalSolutionController>(AppHealthUpsertTechnicalSolutionController);
        handler = module.get<AppHealthUpsertTechnicalSolutionHandler>(AppHealthUpsertTechnicalSolutionHandler);
    });

    describe('main', () =>
    {
        test('AppHealthUpsertTechnicalSolutionController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an technicalSolution upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockTechnicalSolutionData[0])));
            expect(await controller.main(appHealthMockTechnicalSolutionData[0])).toBe(appHealthMockTechnicalSolutionData[0]);
        });
    });
});
