/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpdateAuthenticationInterfaceByIdHandler } from '@api/app-health/authentication-interface';
import { AppHealthUpdateAuthenticationInterfaceByIdInput } from '@api/graphql';
import { appHealthMockAuthenticationInterfaceData } from '@app/app-health/authentication-interface';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateAuthenticationInterfaceByIdHandler', () =>
{
    let handler: AppHealthUpdateAuthenticationInterfaceByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpdateAuthenticationInterfaceByIdHandler,
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

        handler = module.get<AppHealthUpdateAuthenticationInterfaceByIdHandler>(AppHealthUpdateAuthenticationInterfaceByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthUpdateAuthenticationInterfaceByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpdateAuthenticationInterfaceByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a authenticationInterface updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockAuthenticationInterfaceData[0])));
            expect(
                await handler.main(
                    <AppHealthUpdateAuthenticationInterfaceByIdInput>appHealthMockAuthenticationInterfaceData[0],
                    {},
                    'Europe/Madrid',
                ))
                .toBe(appHealthMockAuthenticationInterfaceData[0]);
        });
    });
});
