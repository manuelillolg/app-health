/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthFindDatabaseByIdHandler } from '@api/app-health/database';
import { appHealthMockDatabaseData } from '@app/app-health/database';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindDatabaseByIdHandler', () =>
{
    let handler: AppHealthFindDatabaseByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthFindDatabaseByIdHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AppHealthFindDatabaseByIdHandler>(AppHealthFindDatabaseByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthFindDatabaseByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthFindDatabaseByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an database by id', async () =>
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
