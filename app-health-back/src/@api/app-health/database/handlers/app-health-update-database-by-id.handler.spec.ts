/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpdateDatabaseByIdHandler } from '@api/app-health/database';
import { AppHealthUpdateDatabaseByIdInput } from '@api/graphql';
import { appHealthMockDatabaseData } from '@app/app-health/database';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateDatabaseByIdHandler', () =>
{
    let handler: AppHealthUpdateDatabaseByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpdateDatabaseByIdHandler,
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

        handler = module.get<AppHealthUpdateDatabaseByIdHandler>(AppHealthUpdateDatabaseByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthUpdateDatabaseByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpdateDatabaseByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a database updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockDatabaseData[0])));
            expect(
                await handler.main(
                    <AppHealthUpdateDatabaseByIdInput>appHealthMockDatabaseData[0],
                    {},
                    'Europe/Madrid',
                ))
                .toBe(appHealthMockDatabaseData[0]);
        });
    });
});
