/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthCreateTechnicalSolutionHandler, AppHealthCreateTechnicalSolutionResolver } from '@api/app-health/technical-solution';
import { AppHealthCreateTechnicalSolutionInput } from '@api/graphql';
import { appHealthMockTechnicalSolutionData } from '@app/app-health/technical-solution';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateTechnicalSolutionResolver', () =>
{
    let resolver: AppHealthCreateTechnicalSolutionResolver;
    let handler: AppHealthCreateTechnicalSolutionHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthCreateTechnicalSolutionResolver,
                {
                    provide : AppHealthCreateTechnicalSolutionHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthCreateTechnicalSolutionResolver>(AppHealthCreateTechnicalSolutionResolver);
        handler = module.get<AppHealthCreateTechnicalSolutionHandler>(AppHealthCreateTechnicalSolutionHandler);
    });

    test('AppHealthCreateTechnicalSolutionResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthCreateTechnicalSolutionResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an technicalSolution created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockTechnicalSolutionData[0])));
            expect(await resolver.main(<AppHealthCreateTechnicalSolutionInput>appHealthMockTechnicalSolutionData[0])).toBe(appHealthMockTechnicalSolutionData[0]);
        });
    });
});
