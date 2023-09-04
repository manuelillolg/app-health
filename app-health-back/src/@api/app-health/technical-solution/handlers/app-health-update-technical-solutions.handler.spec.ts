/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpdateTechnicalSolutionsHandler } from '@api/app-health/technical-solution';
import { AppHealthUpdateTechnicalSolutionsInput } from '@api/graphql';
import { appHealthMockTechnicalSolutionData } from '@app/app-health/technical-solution';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateTechnicalSolutionsHandler', () =>
{
    let handler: AppHealthUpdateTechnicalSolutionsHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpdateTechnicalSolutionsHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AppHealthUpdateTechnicalSolutionsHandler>(AppHealthUpdateTechnicalSolutionsHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthUpdateTechnicalSolutionsHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpdateTechnicalSolutionsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a technicalSolutions updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockTechnicalSolutionData[0])));
            expect(
                await handler.main(
                    <AppHealthUpdateTechnicalSolutionsInput>appHealthMockTechnicalSolutionData[0],
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(appHealthMockTechnicalSolutionData[0]);
        });
    });
});
