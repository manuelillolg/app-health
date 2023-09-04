/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthDeleteAuthenticationInterfaceByIdHandler } from '@api/app-health/authentication-interface';
import { appHealthMockAuthenticationInterfaceData } from '@app/app-health/authentication-interface';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteAuthenticationInterfaceByIdController', () =>
{
    let handler: AppHealthDeleteAuthenticationInterfaceByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthDeleteAuthenticationInterfaceByIdHandler,
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

        handler = module.get<AppHealthDeleteAuthenticationInterfaceByIdHandler>(AppHealthDeleteAuthenticationInterfaceByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteAuthenticationInterfaceByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an authenticationInterface deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockAuthenticationInterfaceData[0])));
            expect(
                await handler.main(
                    appHealthMockAuthenticationInterfaceData[0].id,
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(appHealthMockAuthenticationInterfaceData[0]);
        });
    });
});
