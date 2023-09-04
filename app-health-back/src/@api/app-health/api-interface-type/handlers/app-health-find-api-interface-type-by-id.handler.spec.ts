/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthFindApiInterfaceTypeByIdHandler } from '@api/app-health/api-interface-type';
import { appHealthMockApiInterfaceTypeData } from '@app/app-health/api-interface-type';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindApiInterfaceTypeByIdHandler', () =>
{
    let handler: AppHealthFindApiInterfaceTypeByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthFindApiInterfaceTypeByIdHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AppHealthFindApiInterfaceTypeByIdHandler>(AppHealthFindApiInterfaceTypeByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthFindApiInterfaceTypeByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthFindApiInterfaceTypeByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an apiInterfaceType by id', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApiInterfaceTypeData[0])));
            expect(
                await handler.main(
                    appHealthMockApiInterfaceTypeData[0].id,
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(appHealthMockApiInterfaceTypeData[0]);
        });
    });
});
