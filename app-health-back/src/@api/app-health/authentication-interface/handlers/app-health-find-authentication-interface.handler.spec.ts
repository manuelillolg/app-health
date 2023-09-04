/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthFindAuthenticationInterfaceHandler } from '@api/app-health/authentication-interface';
import { appHealthMockAuthenticationInterfaceData } from '@app/app-health/authentication-interface';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindAuthenticationInterfaceHandler', () =>
{
    let handler: AppHealthFindAuthenticationInterfaceHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthFindAuthenticationInterfaceHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AppHealthFindAuthenticationInterfaceHandler>(AppHealthFindAuthenticationInterfaceHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthFindAuthenticationInterfaceHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthFindAuthenticationInterfaceHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a authenticationInterface', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockAuthenticationInterfaceData[0])));
            expect(
                await handler.main(
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(appHealthMockAuthenticationInterfaceData[0]);
        });
    });
});
