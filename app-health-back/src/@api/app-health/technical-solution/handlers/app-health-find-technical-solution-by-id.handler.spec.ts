/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthFindTechnicalSolutionByIdHandler } from '@api/app-health/technical-solution';
import { appHealthMockTechnicalSolutionData } from '@app/app-health/technical-solution';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindTechnicalSolutionByIdHandler', () =>
{
    let handler: AppHealthFindTechnicalSolutionByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthFindTechnicalSolutionByIdHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AppHealthFindTechnicalSolutionByIdHandler>(AppHealthFindTechnicalSolutionByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthFindTechnicalSolutionByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthFindTechnicalSolutionByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an technicalSolution by id', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockTechnicalSolutionData[0])));
            expect(
                await handler.main(
                    appHealthMockTechnicalSolutionData[0].id,
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(appHealthMockTechnicalSolutionData[0]);
        });
    });
});
