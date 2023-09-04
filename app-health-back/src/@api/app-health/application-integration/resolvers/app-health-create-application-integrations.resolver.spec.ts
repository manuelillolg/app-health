import { AppHealthCreateApplicationIntegrationsHandler, AppHealthCreateApplicationIntegrationsResolver } from '@api/app-health/application-integration';
import { AppHealthCreateApplicationIntegrationInput } from '@api/graphql';
import { appHealthMockApplicationIntegrationData } from '@app/app-health/application-integration';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateApplicationIntegrationsResolver', () =>
{
    let resolver: AppHealthCreateApplicationIntegrationsResolver;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateApplicationIntegrationsResolver,
                {
                    provide : AppHealthCreateApplicationIntegrationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthCreateApplicationIntegrationsResolver>(AppHealthCreateApplicationIntegrationsResolver);
    });

    test('AppHealthCreateApplicationIntegrationsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthCreateApplicationIntegrationsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an applicationIntegrations created', async () =>
        {
            expect(await resolver.main(<AppHealthCreateApplicationIntegrationInput[]>appHealthMockApplicationIntegrationData)).toBe(undefined);
        });
    });
});
