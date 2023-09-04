/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthPaginateApplicationIntegrationsHandler } from '@api/app-health/application-integration';
import { appHealthMockApplicationIntegrationData } from '@app/app-health/application-integration';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthPaginateApplicationIntegrationsHandler', () =>
{
    let handler: AppHealthPaginateApplicationIntegrationsHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthPaginateApplicationIntegrationsHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AppHealthPaginateApplicationIntegrationsHandler>(AppHealthPaginateApplicationIntegrationsHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthPaginateApplicationIntegrationsHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthPaginateApplicationIntegrationsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a applicationIntegrations', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve({
                total: appHealthMockApplicationIntegrationData.length,
                count: appHealthMockApplicationIntegrationData.length,
                rows : appHealthMockApplicationIntegrationData,
            })));
            expect(
                await handler.main(
                    {},
                    {},
                ),
            )
                .toEqual({
                    total: appHealthMockApplicationIntegrationData.length,
                    count: appHealthMockApplicationIntegrationData.length,
                    rows : appHealthMockApplicationIntegrationData,
                });
        });
    });
});
