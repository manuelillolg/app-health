/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpsertAuthorizationInterfaceHandler } from '@api/app-health/authorization-interface';
import { appHealthMockAuthorizationInterfaceData } from '@app/app-health/authorization-interface';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpsertAuthorizationInterfaceHandler', () =>
{
    let handler: AppHealthUpsertAuthorizationInterfaceHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpsertAuthorizationInterfaceHandler,
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

        handler = module.get<AppHealthUpsertAuthorizationInterfaceHandler>(AppHealthUpsertAuthorizationInterfaceHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('AppHealthUpsertAuthorizationInterfaceHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an authorizationInterface upserted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockAuthorizationInterfaceData[0])));
            expect(
                await handler.main(
                    appHealthMockAuthorizationInterfaceData[0],
                    'Europe/Madrid',
                ))
                .toBe(appHealthMockAuthorizationInterfaceData[0]);
        });
    });
});
