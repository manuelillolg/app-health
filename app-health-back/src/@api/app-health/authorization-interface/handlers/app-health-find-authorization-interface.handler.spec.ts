/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthFindAuthorizationInterfaceHandler } from '@api/app-health/authorization-interface';
import { appHealthMockAuthorizationInterfaceData } from '@app/app-health/authorization-interface';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindAuthorizationInterfaceHandler', () =>
{
    let handler: AppHealthFindAuthorizationInterfaceHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthFindAuthorizationInterfaceHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AppHealthFindAuthorizationInterfaceHandler>(AppHealthFindAuthorizationInterfaceHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthFindAuthorizationInterfaceHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthFindAuthorizationInterfaceHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a authorizationInterface', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockAuthorizationInterfaceData[0])));
            expect(
                await handler.main(
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(appHealthMockAuthorizationInterfaceData[0]);
        });
    });
});
