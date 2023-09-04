/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpdateTechnicalSolutionsHandler, AppHealthUpdateTechnicalSolutionsResolver } from '@api/app-health/technical-solution';
import { AppHealthUpdateTechnicalSolutionsInput } from '@api/graphql';
import { appHealthMockTechnicalSolutionData } from '@app/app-health/technical-solution';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateTechnicalSolutionsResolver', () =>
{
    let resolver: AppHealthUpdateTechnicalSolutionsResolver;
    let handler: AppHealthUpdateTechnicalSolutionsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpdateTechnicalSolutionsResolver,
                {
                    provide : AppHealthUpdateTechnicalSolutionsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthUpdateTechnicalSolutionsResolver>(AppHealthUpdateTechnicalSolutionsResolver);
        handler = module.get<AppHealthUpdateTechnicalSolutionsHandler>(AppHealthUpdateTechnicalSolutionsHandler);
    });

    test('AppHealthUpdateTechnicalSolutionsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpdateTechnicalSolutionsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a technicalSolutions updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockTechnicalSolutionData[0])));
            expect(await resolver.main(<AppHealthUpdateTechnicalSolutionsInput>appHealthMockTechnicalSolutionData[0])).toBe(appHealthMockTechnicalSolutionData[0]);
        });
    });
});
