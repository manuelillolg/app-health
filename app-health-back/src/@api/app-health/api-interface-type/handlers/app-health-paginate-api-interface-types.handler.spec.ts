/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthPaginateApiInterfaceTypesHandler } from '@api/app-health/api-interface-type';
import { appHealthMockApiInterfaceTypeData } from '@app/app-health/api-interface-type';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthPaginateApiInterfaceTypesHandler', () =>
{
    let handler: AppHealthPaginateApiInterfaceTypesHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthPaginateApiInterfaceTypesHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AppHealthPaginateApiInterfaceTypesHandler>(AppHealthPaginateApiInterfaceTypesHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthPaginateApiInterfaceTypesHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthPaginateApiInterfaceTypesHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a apiInterfaceTypes', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve({
                total: appHealthMockApiInterfaceTypeData.length,
                count: appHealthMockApiInterfaceTypeData.length,
                rows : appHealthMockApiInterfaceTypeData,
            })));
            expect(
                await handler.main(
                    {},
                    {},
                ),
            )
                .toEqual({
                    total: appHealthMockApiInterfaceTypeData.length,
                    count: appHealthMockApiInterfaceTypeData.length,
                    rows : appHealthMockApiInterfaceTypeData,
                });
        });
    });
});
