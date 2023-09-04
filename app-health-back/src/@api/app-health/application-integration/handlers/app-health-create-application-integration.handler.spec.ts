/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthCreateApplicationIntegrationHandler } from '@api/app-health/application-integration';
import { appHealthMockApplicationIntegrationData } from '@app/app-health/application-integration';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateApplicationIntegrationHandler', () =>
{
    let handler: AppHealthCreateApplicationIntegrationHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthCreateApplicationIntegrationHandler,
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

        handler = module.get<AppHealthCreateApplicationIntegrationHandler>(AppHealthCreateApplicationIntegrationHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('AppHealthCreateApplicationIntegrationHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an applicationIntegration created', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationIntegrationData[0])));
            expect(
                await handler.main(
                    appHealthMockApplicationIntegrationData[0],
                    'Europe/Madrid',
                ),
            )
                .toBe(appHealthMockApplicationIntegrationData[0]);
        });
    });
});
