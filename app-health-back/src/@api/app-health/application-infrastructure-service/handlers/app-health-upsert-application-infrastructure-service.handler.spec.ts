/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpsertApplicationInfrastructureServiceHandler } from '@api/app-health/application-infrastructure-service';
import { appHealthMockApplicationInfrastructureServiceData } from '@app/app-health/application-infrastructure-service';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpsertApplicationInfrastructureServiceHandler', () =>
{
    let handler: AppHealthUpsertApplicationInfrastructureServiceHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpsertApplicationInfrastructureServiceHandler,
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

        handler = module.get<AppHealthUpsertApplicationInfrastructureServiceHandler>(AppHealthUpsertApplicationInfrastructureServiceHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('AppHealthUpsertApplicationInfrastructureServiceHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an applicationInfrastructureService upserted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationInfrastructureServiceData[0])));
            expect(
                await handler.main(
                    appHealthMockApplicationInfrastructureServiceData[0],
                    'Europe/Madrid',
                ))
                .toBe(appHealthMockApplicationInfrastructureServiceData[0]);
        });
    });
});
