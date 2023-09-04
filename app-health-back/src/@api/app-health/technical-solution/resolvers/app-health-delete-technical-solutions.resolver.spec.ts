/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthDeleteTechnicalSolutionsHandler, AppHealthDeleteTechnicalSolutionsResolver } from '@api/app-health/technical-solution';
import { appHealthMockTechnicalSolutionData } from '@app/app-health/technical-solution';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteTechnicalSolutionsResolver', () =>
{
    let resolver: AppHealthDeleteTechnicalSolutionsResolver;
    let handler: AppHealthDeleteTechnicalSolutionsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthDeleteTechnicalSolutionsResolver,
                {
                    provide : AppHealthDeleteTechnicalSolutionsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthDeleteTechnicalSolutionsResolver>(AppHealthDeleteTechnicalSolutionsResolver);
        handler = module.get<AppHealthDeleteTechnicalSolutionsHandler>(AppHealthDeleteTechnicalSolutionsHandler);
    });

    test('AppHealthDeleteTechnicalSolutionsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthDeleteTechnicalSolutionsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an appHealthMockTechnicalSolutionData deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockTechnicalSolutionData)));
            expect(await resolver.main()).toBe(appHealthMockTechnicalSolutionData);
        });
    });
});
