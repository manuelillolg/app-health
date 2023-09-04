/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthGetApplicationIntegrationsHandler, AppHealthGetApplicationIntegrationsResolver } from '@api/app-health/application-integration';
import { appHealthMockApplicationIntegrationData } from '@app/app-health/application-integration';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthGetApplicationIntegrationsResolver', () =>
{
    let resolver: AppHealthGetApplicationIntegrationsResolver;
    let handler: AppHealthGetApplicationIntegrationsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthGetApplicationIntegrationsResolver,
                {
                    provide : AppHealthGetApplicationIntegrationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthGetApplicationIntegrationsResolver>(AppHealthGetApplicationIntegrationsResolver);
        handler = module.get<AppHealthGetApplicationIntegrationsHandler>(AppHealthGetApplicationIntegrationsHandler);
    });

    test('AppHealthGetApplicationIntegrationsResolver should be defined', () =>
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthGetApplicationIntegrationsResolver should be defined', () =>
        {
            expect(resolver).   toBeDefined();
        });

        test('should return a appHealthMockApplicationIntegrationData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationIntegrationData)));
            expect(await resolver.main()).toBe(appHealthMockApplicationIntegrationData);
        });
    });
});
