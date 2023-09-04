/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpdateApplicationDatabaseByIdHandler } from '@api/app-health/application-database';
import { AppHealthUpdateApplicationDatabaseByIdInput } from '@api/graphql';
import { appHealthMockApplicationDatabaseData } from '@app/app-health/application-database';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateApplicationDatabaseByIdHandler', () =>
{
    let handler: AppHealthUpdateApplicationDatabaseByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpdateApplicationDatabaseByIdHandler,
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

        handler = module.get<AppHealthUpdateApplicationDatabaseByIdHandler>(AppHealthUpdateApplicationDatabaseByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthUpdateApplicationDatabaseByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpdateApplicationDatabaseByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a applicationDatabase updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationDatabaseData[0])));
            expect(
                await handler.main(
                    <AppHealthUpdateApplicationDatabaseByIdInput>appHealthMockApplicationDatabaseData[0],
                    {},
                    'Europe/Madrid',
                ))
                .toBe(appHealthMockApplicationDatabaseData[0]);
        });
    });
});
