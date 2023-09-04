/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpdateAuthenticationInterfacesHandler } from '@api/app-health/authentication-interface';
import { AppHealthUpdateAuthenticationInterfacesInput } from '@api/graphql';
import { appHealthMockAuthenticationInterfaceData } from '@app/app-health/authentication-interface';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateAuthenticationInterfacesHandler', () =>
{
    let handler: AppHealthUpdateAuthenticationInterfacesHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpdateAuthenticationInterfacesHandler,
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

        handler = module.get<AppHealthUpdateAuthenticationInterfacesHandler>(AppHealthUpdateAuthenticationInterfacesHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthUpdateAuthenticationInterfacesHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpdateAuthenticationInterfacesHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a authenticationInterfaces updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockAuthenticationInterfaceData[0])));
            expect(
                await handler.main(
                    <AppHealthUpdateAuthenticationInterfacesInput>appHealthMockAuthenticationInterfaceData[0],
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(appHealthMockAuthenticationInterfaceData[0]);
        });
    });
});
