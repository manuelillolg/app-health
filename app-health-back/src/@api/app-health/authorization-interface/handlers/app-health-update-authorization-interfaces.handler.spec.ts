/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpdateAuthorizationInterfacesHandler } from '@api/app-health/authorization-interface';
import { AppHealthUpdateAuthorizationInterfacesInput } from '@api/graphql';
import { appHealthMockAuthorizationInterfaceData } from '@app/app-health/authorization-interface';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateAuthorizationInterfacesHandler', () =>
{
    let handler: AppHealthUpdateAuthorizationInterfacesHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpdateAuthorizationInterfacesHandler,
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

        handler = module.get<AppHealthUpdateAuthorizationInterfacesHandler>(AppHealthUpdateAuthorizationInterfacesHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthUpdateAuthorizationInterfacesHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpdateAuthorizationInterfacesHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a authorizationInterfaces updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockAuthorizationInterfaceData[0])));
            expect(
                await handler.main(
                    <AppHealthUpdateAuthorizationInterfacesInput>appHealthMockAuthorizationInterfaceData[0],
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(appHealthMockAuthorizationInterfaceData[0]);
        });
    });
});
