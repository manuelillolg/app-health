/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpdateApiInterfaceTypeByIdHandler } from '@api/app-health/api-interface-type';
import { AppHealthUpdateApiInterfaceTypeByIdInput } from '@api/graphql';
import { appHealthMockApiInterfaceTypeData } from '@app/app-health/api-interface-type';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateApiInterfaceTypeByIdHandler', () =>
{
    let handler: AppHealthUpdateApiInterfaceTypeByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpdateApiInterfaceTypeByIdHandler,
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

        handler = module.get<AppHealthUpdateApiInterfaceTypeByIdHandler>(AppHealthUpdateApiInterfaceTypeByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthUpdateApiInterfaceTypeByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpdateApiInterfaceTypeByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a apiInterfaceType updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApiInterfaceTypeData[0])));
            expect(
                await handler.main(
                    <AppHealthUpdateApiInterfaceTypeByIdInput>appHealthMockApiInterfaceTypeData[0],
                    {},
                    'Europe/Madrid',
                ))
                .toBe(appHealthMockApiInterfaceTypeData[0]);
        });
    });
});
