/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthPaginateAuthorizationInterfacesHandler } from '@api/app-health/authorization-interface';
import { appHealthMockAuthorizationInterfaceData } from '@app/app-health/authorization-interface';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthPaginateAuthorizationInterfacesHandler', () =>
{
    let handler: AppHealthPaginateAuthorizationInterfacesHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthPaginateAuthorizationInterfacesHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AppHealthPaginateAuthorizationInterfacesHandler>(AppHealthPaginateAuthorizationInterfacesHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthPaginateAuthorizationInterfacesHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthPaginateAuthorizationInterfacesHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a authorizationInterfaces', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve({
                total: appHealthMockAuthorizationInterfaceData.length,
                count: appHealthMockAuthorizationInterfaceData.length,
                rows : appHealthMockAuthorizationInterfaceData,
            })));
            expect(
                await handler.main(
                    {},
                    {},
                ),
            )
                .toEqual({
                    total: appHealthMockAuthorizationInterfaceData.length,
                    count: appHealthMockAuthorizationInterfaceData.length,
                    rows : appHealthMockAuthorizationInterfaceData,
                });
        });
    });
});
