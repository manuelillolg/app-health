/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpdateApplicationIntegrationsHandler, AppHealthUpdateApplicationIntegrationsResolver } from '@api/app-health/application-integration';
import { AppHealthUpdateApplicationIntegrationsInput } from '@api/graphql';
import { appHealthMockApplicationIntegrationData } from '@app/app-health/application-integration';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateApplicationIntegrationsResolver', () =>
{
    let resolver: AppHealthUpdateApplicationIntegrationsResolver;
    let handler: AppHealthUpdateApplicationIntegrationsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpdateApplicationIntegrationsResolver,
                {
                    provide : AppHealthUpdateApplicationIntegrationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthUpdateApplicationIntegrationsResolver>(AppHealthUpdateApplicationIntegrationsResolver);
        handler = module.get<AppHealthUpdateApplicationIntegrationsHandler>(AppHealthUpdateApplicationIntegrationsHandler);
    });

    test('AppHealthUpdateApplicationIntegrationsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpdateApplicationIntegrationsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a applicationIntegrations updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationIntegrationData[0])));
            expect(await resolver.main(<AppHealthUpdateApplicationIntegrationsInput>appHealthMockApplicationIntegrationData[0])).toBe(appHealthMockApplicationIntegrationData[0]);
        });
    });
});
