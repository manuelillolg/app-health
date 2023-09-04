/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthFindInfrastructureProviderByIdHandler } from '@api/app-health/infrastructure-provider';
import { appHealthMockInfrastructureProviderData } from '@app/app-health/infrastructure-provider';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindInfrastructureProviderByIdHandler', () =>
{
    let handler: AppHealthFindInfrastructureProviderByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthFindInfrastructureProviderByIdHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AppHealthFindInfrastructureProviderByIdHandler>(AppHealthFindInfrastructureProviderByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthFindInfrastructureProviderByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthFindInfrastructureProviderByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an infrastructureProvider by id', async () =>
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
