/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpdateApplicationIntegrationsHandler } from '@api/app-health/application-integration';
import { AppHealthUpdateApplicationIntegrationsInput } from '@api/graphql';
import { appHealthMockApplicationIntegrationData } from '@app/app-health/application-integration';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateApplicationIntegrationsHandler', () =>
{
    let handler: AppHealthUpdateApplicationIntegrationsHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpdateApplicationIntegrationsHandler,
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

        handler = module.get<AppHealthUpdateApplicationIntegrationsHandler>(AppHealthUpdateApplicationIntegrationsHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthUpdateApplicationIntegrationsHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpdateApplicationIntegrationsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a applicationIntegrations updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationIntegrationData[0])));
            expect(
                await handler.main(
                    <AppHealthUpdateApplicationIntegrationsInput>appHealthMockApplicationIntegrationData[0],
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(appHealthMockApplicationIntegrationData[0]);
        });
    });
});
