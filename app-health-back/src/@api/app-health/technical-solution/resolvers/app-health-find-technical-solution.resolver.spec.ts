/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthFindTechnicalSolutionHandler, AppHealthFindTechnicalSolutionResolver } from '@api/app-health/technical-solution';
import { appHealthMockTechnicalSolutionData } from '@app/app-health/technical-solution';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindTechnicalSolutionResolver', () =>
{
    let resolver: AppHealthFindTechnicalSolutionResolver;
    let handler: AppHealthFindTechnicalSolutionHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthFindTechnicalSolutionResolver,
                {
                    provide : AppHealthFindTechnicalSolutionHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthFindTechnicalSolutionResolver>(AppHealthFindTechnicalSolutionResolver);
        handler = module.get<AppHealthFindTechnicalSolutionHandler>(AppHealthFindTechnicalSolutionHandler);
    });

    test('AppHealthFindTechnicalSolutionResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthFindTechnicalSolutionResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a technicalSolution', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockTechnicalSolutionData[0])));
            expect(await resolver.main()).toBe(appHealthMockTechnicalSolutionData[0]);
        });
    });
});
