/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthFindAuthorizationInterfaceByIdHandler } from '@api/app-health/authorization-interface';
import { appHealthMockAuthorizationInterfaceData } from '@app/app-health/authorization-interface';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindAuthorizationInterfaceByIdHandler', () =>
{
    let handler: AppHealthFindAuthorizationInterfaceByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthFindAuthorizationInterfaceByIdHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AppHealthFindAuthorizationInterfaceByIdHandler>(AppHealthFindAuthorizationInterfaceByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthFindAuthorizationInterfaceByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthFindAuthorizationInterfaceByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an authorizationInterface by id', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockAuthorizationInterfaceData[0])));
            expect(
                await handler.main(
                    appHealthMockAuthorizationInterfaceData[0].id,
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(appHealthMockAuthorizationInterfaceData[0]);
        });
    });
});
