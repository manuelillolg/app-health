/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthFindTechnicalSolutionHandler } from '@api/app-health/technical-solution';
import { appHealthMockTechnicalSolutionData } from '@app/app-health/technical-solution';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindTechnicalSolutionHandler', () =>
{
    let handler: AppHealthFindTechnicalSolutionHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthFindTechnicalSolutionHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AppHealthFindTechnicalSolutionHandler>(AppHealthFindTechnicalSolutionHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthFindTechnicalSolutionHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthFindTechnicalSolutionHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a technicalSolution', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockTechnicalSolutionData[0])));
            expect(
                await handler.main(
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(appHealthMockTechnicalSolutionData[0]);
        });
    });
});
