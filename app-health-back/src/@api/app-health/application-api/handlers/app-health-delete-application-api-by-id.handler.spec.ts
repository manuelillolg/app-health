/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthDeleteApplicationApiByIdHandler } from '@api/app-health/application-api';
import { appHealthMockApplicationApiData } from '@app/app-health/application-api';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteApplicationApiByIdController', () =>
{
    let handler: AppHealthDeleteApplicationApiByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthDeleteApplicationApiByIdHandler,
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

        handler = module.get<AppHealthDeleteApplicationApiByIdHandler>(AppHealthDeleteApplicationApiByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteApplicationApiByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an applicationApi deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationApiData[0])));
            expect(
                await handler.main(
                    appHealthMockApplicationApiData[0].id,
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(appHealthMockApplicationApiData[0]);
        });
    });
});
