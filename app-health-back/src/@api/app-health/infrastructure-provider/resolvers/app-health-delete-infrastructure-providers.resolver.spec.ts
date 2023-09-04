/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthDeleteInfrastructureProvidersHandler, AppHealthDeleteInfrastructureProvidersResolver } from '@api/app-health/infrastructure-provider';
import { appHealthMockInfrastructureProviderData } from '@app/app-health/infrastructure-provider';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteInfrastructureProvidersResolver', () =>
{
    let resolver: AppHealthDeleteInfrastructureProvidersResolver;
    let handler: AppHealthDeleteInfrastructureProvidersHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthDeleteInfrastructureProvidersResolver,
                {
                    provide : AppHealthDeleteInfrastructureProvidersHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthDeleteInfrastructureProvidersResolver>(AppHealthDeleteInfrastructureProvidersResolver);
        handler = module.get<AppHealthDeleteInfrastructureProvidersHandler>(AppHealthDeleteInfrastructureProvidersHandler);
    });

    test('AppHealthDeleteInfrastructureProvidersResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthDeleteInfrastructureProvidersResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an appHealthMockInfrastructureProviderData deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockInfrastructureProviderData)));
            expect(await resolver.main()).toBe(appHealthMockInfrastructureProviderData);
        });
    });
});
