/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthFindApiInterfaceTypeHandler } from '@api/app-health/api-interface-type';
import { appHealthMockApiInterfaceTypeData } from '@app/app-health/api-interface-type';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindApiInterfaceTypeHandler', () =>
{
    let handler: AppHealthFindApiInterfaceTypeHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthFindApiInterfaceTypeHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AppHealthFindApiInterfaceTypeHandler>(AppHealthFindApiInterfaceTypeHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthFindApiInterfaceTypeHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthFindApiInterfaceTypeHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a apiInterfaceType', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApiInterfaceTypeData[0])));
            expect(
                await handler.main(
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(appHealthMockApiInterfaceTypeData[0]);
        });
    });
});
