/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthDeleteDatabaseByIdHandler } from '@api/app-health/database';
import { appHealthMockDatabaseData } from '@app/app-health/database';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteDatabaseByIdController', () =>
{
    let handler: AppHealthDeleteDatabaseByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthDeleteDatabaseByIdHandler,
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

        handler = module.get<AppHealthDeleteDatabaseByIdHandler>(AppHealthDeleteDatabaseByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteDatabaseByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an database deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockDatabaseData[0])));
            expect(
                await handler.main(
                    appHealthMockDatabaseData[0].id,
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(appHealthMockDatabaseData[0]);
        });
    });
});
