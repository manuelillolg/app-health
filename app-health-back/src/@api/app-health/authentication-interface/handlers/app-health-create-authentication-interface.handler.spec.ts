/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthCreateAuthenticationInterfaceHandler } from '@api/app-health/authentication-interface';
import { appHealthMockAuthenticationInterfaceData } from '@app/app-health/authentication-interface';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateAuthenticationInterfaceHandler', () =>
{
    let handler: AppHealthCreateAuthenticationInterfaceHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthCreateAuthenticationInterfaceHandler,
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

        handler = module.get<AppHealthCreateAuthenticationInterfaceHandler>(AppHealthCreateAuthenticationInterfaceHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('AppHealthCreateAuthenticationInterfaceHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an authenticationInterface created', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockAuthenticationInterfaceData[0])));
            expect(
                await handler.main(
                    appHealthMockAuthenticationInterfaceData[0],
                    'Europe/Madrid',
                ),
            )
                .toBe(appHealthMockAuthenticationInterfaceData[0]);
        });
    });
});
