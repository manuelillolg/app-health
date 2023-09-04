/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthFindInfrastructureProviderHandler } from '@api/app-health/infrastructure-provider';
import { appHealthMockInfrastructureProviderData } from '@app/app-health/infrastructure-provider';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindInfrastructureProviderHandler', () =>
{
    let handler: AppHealthFindInfrastructureProviderHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthFindInfrastructureProviderHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AppHealthFindInfrastructureProviderHandler>(AppHealthFindInfrastructureProviderHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthFindInfrastructureProviderHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthFindInfrastructureProviderHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a infrastructureProvider', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockInfrastructureProviderData[0])));
            expect(
                await handler.main(
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(appHealthMockInfrastructureProviderData[0]);
        });
    });
});
