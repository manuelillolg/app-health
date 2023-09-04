/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthGetTechnicalSolutionsHandler, AppHealthGetTechnicalSolutionsResolver } from '@api/app-health/technical-solution';
import { appHealthMockTechnicalSolutionData } from '@app/app-health/technical-solution';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthGetTechnicalSolutionsResolver', () =>
{
    let resolver: AppHealthGetTechnicalSolutionsResolver;
    let handler: AppHealthGetTechnicalSolutionsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthGetTechnicalSolutionsResolver,
                {
                    provide : AppHealthGetTechnicalSolutionsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthGetTechnicalSolutionsResolver>(AppHealthGetTechnicalSolutionsResolver);
        handler = module.get<AppHealthGetTechnicalSolutionsHandler>(AppHealthGetTechnicalSolutionsHandler);
    });

    test('AppHealthGetTechnicalSolutionsResolver should be defined', () =>
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthGetTechnicalSolutionsResolver should be defined', () =>
        {
            expect(resolver).   toBeDefined();
        });

        test('should return a appHealthMockTechnicalSolutionData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockTechnicalSolutionData)));
            expect(await resolver.main()).toBe(appHealthMockTechnicalSolutionData);
        });
    });
});
