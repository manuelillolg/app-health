import { AppHealthCreateTechnicalSolutionController, AppHealthCreateTechnicalSolutionHandler } from '@api/app-health/technical-solution';
import { appHealthMockTechnicalSolutionData } from '@app/app-health/technical-solution';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateTechnicalSolutionController', () =>
{
    let controller: AppHealthCreateTechnicalSolutionController;
    let handler: AppHealthCreateTechnicalSolutionHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthCreateTechnicalSolutionController,
            ],
            providers: [
                {
                    provide : AppHealthCreateTechnicalSolutionHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthCreateTechnicalSolutionController>(AppHealthCreateTechnicalSolutionController);
        handler = module.get<AppHealthCreateTechnicalSolutionHandler>(AppHealthCreateTechnicalSolutionHandler);
    });

    describe('main', () =>
    {
        test('AppHealthCreateTechnicalSolutionController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an technicalSolution created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockTechnicalSolutionData[0])));
            expect(
                await controller.main(
                    appHealthMockTechnicalSolutionData[0],
                ),
            )
                .toBe(appHealthMockTechnicalSolutionData[0]);
        });
    });
});
