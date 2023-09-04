/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthCreateTechnicalSolutionHandler } from '@api/app-health/technical-solution';
import { appHealthMockTechnicalSolutionData } from '@app/app-health/technical-solution';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateTechnicalSolutionHandler', () =>
{
    let handler: AppHealthCreateTechnicalSolutionHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthCreateTechnicalSolutionHandler,
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

        handler = module.get<AppHealthCreateTechnicalSolutionHandler>(AppHealthCreateTechnicalSolutionHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('AppHealthCreateTechnicalSolutionHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an technicalSolution created', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockTechnicalSolutionData[0])));
            expect(
                await handler.main(
                    appHealthMockTechnicalSolutionData[0],
                    'Europe/Madrid',
                ),
            )
                .toBe(appHealthMockTechnicalSolutionData[0]);
        });
    });
});
