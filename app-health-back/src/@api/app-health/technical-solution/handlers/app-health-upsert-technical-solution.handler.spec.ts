/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpsertTechnicalSolutionHandler } from '@api/app-health/technical-solution';
import { appHealthMockTechnicalSolutionData } from '@app/app-health/technical-solution';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpsertTechnicalSolutionHandler', () =>
{
    let handler: AppHealthUpsertTechnicalSolutionHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpsertTechnicalSolutionHandler,
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

        handler = module.get<AppHealthUpsertTechnicalSolutionHandler>(AppHealthUpsertTechnicalSolutionHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('AppHealthUpsertTechnicalSolutionHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an technicalSolution upserted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockTechnicalSolutionData[0])));
            expect(
                await handler.main(
                    appHealthMockTechnicalSolutionData[0],
                    'Europe/Madrid',
                ))
                .toBe(appHealthMockTechnicalSolutionData[0]);
        });
    });
});
