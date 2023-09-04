/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpdateInfrastructureProvidersHandler } from '@api/app-health/infrastructure-provider';
import { AppHealthUpdateInfrastructureProvidersInput } from '@api/graphql';
import { appHealthMockInfrastructureProviderData } from '@app/app-health/infrastructure-provider';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateInfrastructureProvidersHandler', () =>
{
    let handler: AppHealthUpdateInfrastructureProvidersHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpdateInfrastructureProvidersHandler,
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

        handler = module.get<AppHealthUpdateInfrastructureProvidersHandler>(AppHealthUpdateInfrastructureProvidersHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthUpdateInfrastructureProvidersHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpdateInfrastructureProvidersHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a infrastructureProviders updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockInfrastructureProviderData[0])));
            expect(
                await handler.main(
                    <AppHealthUpdateInfrastructureProvidersInput>appHealthMockInfrastructureProviderData[0],
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(appHealthMockInfrastructureProviderData[0]);
        });
    });
});
