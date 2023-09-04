/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpsertApplicationIntegrationHandler } from '@api/app-health/application-integration';
import { appHealthMockApplicationIntegrationData } from '@app/app-health/application-integration';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpsertApplicationIntegrationHandler', () =>
{
    let handler: AppHealthUpsertApplicationIntegrationHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpsertApplicationIntegrationHandler,
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

        handler = module.get<AppHealthUpsertApplicationIntegrationHandler>(AppHealthUpsertApplicationIntegrationHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('AppHealthUpsertApplicationIntegrationHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an applicationIntegration upserted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationIntegrationData[0])));
            expect(
                await handler.main(
                    appHealthMockApplicationIntegrationData[0],
                    'Europe/Madrid',
                ))
                .toBe(appHealthMockApplicationIntegrationData[0]);
        });
    });
});
