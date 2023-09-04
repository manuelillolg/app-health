/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpdateApiInterfaceTypesHandler } from '@api/app-health/api-interface-type';
import { AppHealthUpdateApiInterfaceTypesInput } from '@api/graphql';
import { appHealthMockApiInterfaceTypeData } from '@app/app-health/api-interface-type';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateApiInterfaceTypesHandler', () =>
{
    let handler: AppHealthUpdateApiInterfaceTypesHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpdateApiInterfaceTypesHandler,
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

        handler = module.get<AppHealthUpdateApiInterfaceTypesHandler>(AppHealthUpdateApiInterfaceTypesHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthUpdateApiInterfaceTypesHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpdateApiInterfaceTypesHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a apiInterfaceTypes updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApiInterfaceTypeData[0])));
            expect(
                await handler.main(
                    <AppHealthUpdateApiInterfaceTypesInput>appHealthMockApiInterfaceTypeData[0],
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(appHealthMockApiInterfaceTypeData[0]);
        });
    });
});
