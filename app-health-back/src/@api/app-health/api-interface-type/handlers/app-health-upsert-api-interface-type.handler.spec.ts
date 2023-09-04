/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpsertApiInterfaceTypeHandler } from '@api/app-health/api-interface-type';
import { appHealthMockApiInterfaceTypeData } from '@app/app-health/api-interface-type';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpsertApiInterfaceTypeHandler', () =>
{
    let handler: AppHealthUpsertApiInterfaceTypeHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpsertApiInterfaceTypeHandler,
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

        handler = module.get<AppHealthUpsertApiInterfaceTypeHandler>(AppHealthUpsertApiInterfaceTypeHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('AppHealthUpsertApiInterfaceTypeHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an apiInterfaceType upserted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApiInterfaceTypeData[0])));
            expect(
                await handler.main(
                    appHealthMockApiInterfaceTypeData[0],
                    'Europe/Madrid',
                ))
                .toBe(appHealthMockApiInterfaceTypeData[0]);
        });
    });
});
