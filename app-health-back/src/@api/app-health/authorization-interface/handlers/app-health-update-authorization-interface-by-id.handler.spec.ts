/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpdateAuthorizationInterfaceByIdHandler } from '@api/app-health/authorization-interface';
import { AppHealthUpdateAuthorizationInterfaceByIdInput } from '@api/graphql';
import { appHealthMockAuthorizationInterfaceData } from '@app/app-health/authorization-interface';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateAuthorizationInterfaceByIdHandler', () =>
{
    let handler: AppHealthUpdateAuthorizationInterfaceByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpdateAuthorizationInterfaceByIdHandler,
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

        handler = module.get<AppHealthUpdateAuthorizationInterfaceByIdHandler>(AppHealthUpdateAuthorizationInterfaceByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthUpdateAuthorizationInterfaceByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpdateAuthorizationInterfaceByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a authorizationInterface updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockAuthorizationInterfaceData[0])));
            expect(
                await handler.main(
                    <AppHealthUpdateAuthorizationInterfaceByIdInput>appHealthMockAuthorizationInterfaceData[0],
                    {},
                    'Europe/Madrid',
                ))
                .toBe(appHealthMockAuthorizationInterfaceData[0]);
        });
    });
});
