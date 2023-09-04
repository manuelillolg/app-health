/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpdateTechnicalSolutionByIdHandler, AppHealthUpdateTechnicalSolutionByIdResolver } from '@api/app-health/technical-solution';
import { AppHealthUpdateTechnicalSolutionByIdInput } from '@api/graphql';
import { appHealthMockTechnicalSolutionData } from '@app/app-health/technical-solution';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateTechnicalSolutionByIdResolver', () =>
{
    let resolver: AppHealthUpdateTechnicalSolutionByIdResolver;
    let handler: AppHealthUpdateTechnicalSolutionByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpdateTechnicalSolutionByIdResolver,
                {
                    provide : AppHealthUpdateTechnicalSolutionByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthUpdateTechnicalSolutionByIdResolver>(AppHealthUpdateTechnicalSolutionByIdResolver);
        handler = module.get<AppHealthUpdateTechnicalSolutionByIdHandler>(AppHealthUpdateTechnicalSolutionByIdHandler);
    });

    test('AppHealthUpdateTechnicalSolutionByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpdateTechnicalSolutionByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a technicalSolution by id updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockTechnicalSolutionData[0])));
            expect(await resolver.main(<AppHealthUpdateTechnicalSolutionByIdInput>appHealthMockTechnicalSolutionData[0])).toBe(appHealthMockTechnicalSolutionData[0]);
        });
    });
});
