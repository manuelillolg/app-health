/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpsertTechnicalSolutionHandler, AppHealthUpsertTechnicalSolutionResolver } from '@api/app-health/technical-solution';
import { AppHealthUpdateTechnicalSolutionByIdInput } from '@api/graphql';
import { appHealthMockTechnicalSolutionData } from '@app/app-health/technical-solution';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpsertTechnicalSolutionResolver', () =>
{
    let resolver: AppHealthUpsertTechnicalSolutionResolver;
    let handler: AppHealthUpsertTechnicalSolutionHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpsertTechnicalSolutionResolver,
                {
                    provide : AppHealthUpsertTechnicalSolutionHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthUpsertTechnicalSolutionResolver>(AppHealthUpsertTechnicalSolutionResolver);
        handler = module.get<AppHealthUpsertTechnicalSolutionHandler>(AppHealthUpsertTechnicalSolutionHandler);
    });

    test('AppHealthUpsertTechnicalSolutionResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpsertTechnicalSolutionResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an technicalSolution upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockTechnicalSolutionData[0])));
            expect(await resolver.main(<AppHealthUpdateTechnicalSolutionByIdInput>appHealthMockTechnicalSolutionData[0])).toBe(appHealthMockTechnicalSolutionData[0]);
        });
    });
});
