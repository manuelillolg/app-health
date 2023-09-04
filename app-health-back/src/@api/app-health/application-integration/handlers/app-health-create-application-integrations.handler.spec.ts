import { AppHealthCreateApplicationIntegrationsHandler } from '@api/app-health/application-integration';
import { appHealthMockApplicationIntegrationData } from '@app/app-health/application-integration';
import { ICommandBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateApplicationIntegrationsHandler', () =>
{
    let handler: AppHealthCreateApplicationIntegrationsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateApplicationIntegrationsHandler,
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AppHealthCreateApplicationIntegrationsHandler>(AppHealthCreateApplicationIntegrationsHandler);
    });

    describe('main', () =>
    {
        test('AppHealthCreateApplicationIntegrationsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an appHealthMockApplicationIntegrationData created', async () =>
        {
            expect(await handler.main(appHealthMockApplicationIntegrationData)).toBe(true);
        });
    });
});
