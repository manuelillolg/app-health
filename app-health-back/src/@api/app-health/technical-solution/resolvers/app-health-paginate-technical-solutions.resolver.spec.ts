/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthPaginateTechnicalSolutionsHandler, AppHealthPaginateTechnicalSolutionsResolver } from '@api/app-health/technical-solution';
import { appHealthMockTechnicalSolutionData } from '@app/app-health/technical-solution';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthPaginateTechnicalSolutionsResolver', () =>
{
    let resolver: AppHealthPaginateTechnicalSolutionsResolver;
    let handler: AppHealthPaginateTechnicalSolutionsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthPaginateTechnicalSolutionsResolver,
                {
                    provide : AppHealthPaginateTechnicalSolutionsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthPaginateTechnicalSolutionsResolver>(AppHealthPaginateTechnicalSolutionsResolver);
        handler = module.get<AppHealthPaginateTechnicalSolutionsHandler>(AppHealthPaginateTechnicalSolutionsHandler);
    });

    test('AppHealthPaginateTechnicalSolutionsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthPaginateTechnicalSolutionsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a appHealthMockTechnicalSolutionData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : appHealthMockTechnicalSolutionData,
            })));
            expect(await resolver.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : appHealthMockTechnicalSolutionData,
            });
        });
    });
});
