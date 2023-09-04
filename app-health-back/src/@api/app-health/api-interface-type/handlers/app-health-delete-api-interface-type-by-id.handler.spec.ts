/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthDeleteApiInterfaceTypeByIdHandler } from '@api/app-health/api-interface-type';
import { appHealthMockApiInterfaceTypeData } from '@app/app-health/api-interface-type';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteApiInterfaceTypeByIdController', () =>
{
    let handler: AppHealthDeleteApiInterfaceTypeByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthDeleteApiInterfaceTypeByIdHandler,
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

        handler = module.get<AppHealthDeleteApiInterfaceTypeByIdHandler>(AppHealthDeleteApiInterfaceTypeByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteApiInterfaceTypeByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an apiInterfaceType deleted', async () =>
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
