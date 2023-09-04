/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpdateApplicationDatabasesHandler } from '@api/app-health/application-database';
import { AppHealthUpdateApplicationDatabasesInput } from '@api/graphql';
import { appHealthMockApplicationDatabaseData } from '@app/app-health/application-database';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateApplicationDatabasesHandler', () =>
{
    let handler: AppHealthUpdateApplicationDatabasesHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpdateApplicationDatabasesHandler,
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

        handler = module.get<AppHealthUpdateApplicationDatabasesHandler>(AppHealthUpdateApplicationDatabasesHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthUpdateApplicationDatabasesHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpdateApplicationDatabasesHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a applicationDatabases updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationDatabaseData[0])));
            expect(
                await handler.main(
                    <AppHealthUpdateApplicationDatabasesInput>appHealthMockApplicationDatabaseData[0],
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(appHealthMockApplicationDatabaseData[0]);
        });
    });
});
