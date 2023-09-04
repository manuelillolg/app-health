import { AppHealthCreateTechnicalSolutionsHandler, AppHealthCreateTechnicalSolutionsResolver } from '@api/app-health/technical-solution';
import { AppHealthCreateTechnicalSolutionInput } from '@api/graphql';
import { appHealthMockTechnicalSolutionData } from '@app/app-health/technical-solution';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateTechnicalSolutionsResolver', () =>
{
    let resolver: AppHealthCreateTechnicalSolutionsResolver;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateTechnicalSolutionsResolver,
                {
                    provide : AppHealthCreateTechnicalSolutionsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthCreateTechnicalSolutionsResolver>(AppHealthCreateTechnicalSolutionsResolver);
    });

    test('AppHealthCreateTechnicalSolutionsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthCreateTechnicalSolutionsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an technicalSolutions created', async () =>
        {
            expect(await resolver.main(<AppHealthCreateTechnicalSolutionInput[]>appHealthMockTechnicalSolutionData)).toBe(undefined);
        });
    });
});
