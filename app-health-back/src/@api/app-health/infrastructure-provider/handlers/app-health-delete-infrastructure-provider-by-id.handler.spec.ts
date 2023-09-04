/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthDeleteInfrastructureProviderByIdHandler } from '@api/app-health/infrastructure-provider';
import { appHealthMockInfrastructureProviderData } from '@app/app-health/infrastructure-provider';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteInfrastructureProviderByIdController', () =>
{
    let handler: AppHealthDeleteInfrastructureProviderByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthDeleteInfrastructureProviderByIdHandler,
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

        handler = module.get<AppHealthDeleteInfrastructureProviderByIdHandler>(AppHealthDeleteInfrastructureProviderByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteInfrastructureProviderByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an infrastructureProvider deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockInfrastructureProviderData[0])));
            expect(
                await handler.main(
                    appHealthMockInfrastructureProviderData[0].id,
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(appHealthMockInfrastructureProviderData[0]);
        });
    });
});
