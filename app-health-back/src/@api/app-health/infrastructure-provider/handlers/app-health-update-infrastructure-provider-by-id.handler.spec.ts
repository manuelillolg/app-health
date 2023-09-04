/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpdateInfrastructureProviderByIdHandler } from '@api/app-health/infrastructure-provider';
import { AppHealthUpdateInfrastructureProviderByIdInput } from '@api/graphql';
import { appHealthMockInfrastructureProviderData } from '@app/app-health/infrastructure-provider';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateInfrastructureProviderByIdHandler', () =>
{
    let handler: AppHealthUpdateInfrastructureProviderByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpdateInfrastructureProviderByIdHandler,
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

        handler = module.get<AppHealthUpdateInfrastructureProviderByIdHandler>(AppHealthUpdateInfrastructureProviderByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthUpdateInfrastructureProviderByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpdateInfrastructureProviderByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a infrastructureProvider updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockInfrastructureProviderData[0])));
            expect(
                await handler.main(
                    <AppHealthUpdateInfrastructureProviderByIdInput>appHealthMockInfrastructureProviderData[0],
                    {},
                    'Europe/Madrid',
                ))
                .toBe(appHealthMockInfrastructureProviderData[0]);
        });
    });
});
