/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthPaginateInfrastructureProvidersHandler } from '@api/app-health/infrastructure-provider';
import { appHealthMockInfrastructureProviderData } from '@app/app-health/infrastructure-provider';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthPaginateInfrastructureProvidersHandler', () =>
{
    let handler: AppHealthPaginateInfrastructureProvidersHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthPaginateInfrastructureProvidersHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AppHealthPaginateInfrastructureProvidersHandler>(AppHealthPaginateInfrastructureProvidersHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthPaginateInfrastructureProvidersHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthPaginateInfrastructureProvidersHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a infrastructureProviders', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve({
                total: appHealthMockInfrastructureProviderData.length,
                count: appHealthMockInfrastructureProviderData.length,
                rows : appHealthMockInfrastructureProviderData,
            })));
            expect(
                await handler.main(
                    {},
                    {},
                ),
            )
                .toEqual({
                    total: appHealthMockInfrastructureProviderData.length,
                    count: appHealthMockInfrastructureProviderData.length,
                    rows : appHealthMockInfrastructureProviderData,
                });
        });
    });
});
