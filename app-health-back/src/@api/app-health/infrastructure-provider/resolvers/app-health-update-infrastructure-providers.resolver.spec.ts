/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpdateInfrastructureProvidersHandler, AppHealthUpdateInfrastructureProvidersResolver } from '@api/app-health/infrastructure-provider';
import { AppHealthUpdateInfrastructureProvidersInput } from '@api/graphql';
import { appHealthMockInfrastructureProviderData } from '@app/app-health/infrastructure-provider';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateInfrastructureProvidersResolver', () =>
{
    let resolver: AppHealthUpdateInfrastructureProvidersResolver;
    let handler: AppHealthUpdateInfrastructureProvidersHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpdateInfrastructureProvidersResolver,
                {
                    provide : AppHealthUpdateInfrastructureProvidersHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthUpdateInfrastructureProvidersResolver>(AppHealthUpdateInfrastructureProvidersResolver);
        handler = module.get<AppHealthUpdateInfrastructureProvidersHandler>(AppHealthUpdateInfrastructureProvidersHandler);
    });

    test('AppHealthUpdateInfrastructureProvidersResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpdateInfrastructureProvidersResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a infrastructureProviders updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockInfrastructureProviderData[0])));
            expect(await resolver.main(<AppHealthUpdateInfrastructureProvidersInput>appHealthMockInfrastructureProviderData[0])).toBe(appHealthMockInfrastructureProviderData[0]);
        });
    });
});
