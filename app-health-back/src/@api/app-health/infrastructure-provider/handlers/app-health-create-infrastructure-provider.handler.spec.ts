/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthCreateInfrastructureProviderHandler } from '@api/app-health/infrastructure-provider';
import { appHealthMockInfrastructureProviderData } from '@app/app-health/infrastructure-provider';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateInfrastructureProviderHandler', () =>
{
    let handler: AppHealthCreateInfrastructureProviderHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthCreateInfrastructureProviderHandler,
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

        handler = module.get<AppHealthCreateInfrastructureProviderHandler>(AppHealthCreateInfrastructureProviderHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('AppHealthCreateInfrastructureProviderHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an infrastructureProvider created', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockInfrastructureProviderData[0])));
            expect(
                await handler.main(
                    appHealthMockInfrastructureProviderData[0],
                    'Europe/Madrid',
                ),
            )
                .toBe(appHealthMockInfrastructureProviderData[0]);
        });
    });
});
