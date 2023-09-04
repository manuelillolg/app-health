/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpsertInfrastructureServiceHandler } from '@api/app-health/infrastructure-service';
import { appHealthMockInfrastructureServiceData } from '@app/app-health/infrastructure-service';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpsertInfrastructureServiceHandler', () =>
{
    let handler: AppHealthUpsertInfrastructureServiceHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpsertInfrastructureServiceHandler,
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

        handler = module.get<AppHealthUpsertInfrastructureServiceHandler>(AppHealthUpsertInfrastructureServiceHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('AppHealthUpsertInfrastructureServiceHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an infrastructureService upserted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockInfrastructureServiceData[0])));
            expect(
                await handler.main(
                    appHealthMockInfrastructureServiceData[0],
                    'Europe/Madrid',
                ))
                .toBe(appHealthMockInfrastructureServiceData[0]);
        });
    });
});
