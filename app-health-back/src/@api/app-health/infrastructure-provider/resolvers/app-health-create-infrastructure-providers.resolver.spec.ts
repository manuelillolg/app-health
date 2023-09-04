import { AppHealthCreateInfrastructureProvidersHandler, AppHealthCreateInfrastructureProvidersResolver } from '@api/app-health/infrastructure-provider';
import { AppHealthCreateInfrastructureProviderInput } from '@api/graphql';
import { appHealthMockInfrastructureProviderData } from '@app/app-health/infrastructure-provider';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateInfrastructureProvidersResolver', () =>
{
    let resolver: AppHealthCreateInfrastructureProvidersResolver;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateInfrastructureProvidersResolver,
                {
                    provide : AppHealthCreateInfrastructureProvidersHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthCreateInfrastructureProvidersResolver>(AppHealthCreateInfrastructureProvidersResolver);
    });

    test('AppHealthCreateInfrastructureProvidersResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthCreateInfrastructureProvidersResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an infrastructureProviders created', async () =>
        {
            expect(await resolver.main(<AppHealthCreateInfrastructureProviderInput[]>appHealthMockInfrastructureProviderData)).toBe(undefined);
        });
    });
});
