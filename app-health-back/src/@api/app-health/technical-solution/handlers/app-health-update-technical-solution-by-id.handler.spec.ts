/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpdateTechnicalSolutionByIdHandler } from '@api/app-health/technical-solution';
import { AppHealthUpdateTechnicalSolutionByIdInput } from '@api/graphql';
import { appHealthMockTechnicalSolutionData } from '@app/app-health/technical-solution';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateTechnicalSolutionByIdHandler', () =>
{
    let handler: AppHealthUpdateTechnicalSolutionByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpdateTechnicalSolutionByIdHandler,
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

        handler = module.get<AppHealthUpdateTechnicalSolutionByIdHandler>(AppHealthUpdateTechnicalSolutionByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthUpdateTechnicalSolutionByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpdateTechnicalSolutionByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a technicalSolution updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockTechnicalSolutionData[0])));
            expect(
                await handler.main(
                    <AppHealthUpdateTechnicalSolutionByIdInput>appHealthMockTechnicalSolutionData[0],
                    {},
                    'Europe/Madrid',
                ))
                .toBe(appHealthMockTechnicalSolutionData[0]);
        });
    });
});
