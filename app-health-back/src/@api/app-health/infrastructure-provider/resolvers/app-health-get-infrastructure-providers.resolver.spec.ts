/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthGetInfrastructureProvidersHandler, AppHealthGetInfrastructureProvidersResolver } from '@api/app-health/infrastructure-provider';
import { appHealthMockInfrastructureProviderData } from '@app/app-health/infrastructure-provider';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthGetInfrastructureProvidersResolver', () =>
{
    let resolver: AppHealthGetInfrastructureProvidersResolver;
    let handler: AppHealthGetInfrastructureProvidersHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthGetInfrastructureProvidersResolver,
                {
                    provide : AppHealthGetInfrastructureProvidersHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthGetInfrastructureProvidersResolver>(AppHealthGetInfrastructureProvidersResolver);
        handler = module.get<AppHealthGetInfrastructureProvidersHandler>(AppHealthGetInfrastructureProvidersHandler);
    });

    test('AppHealthGetInfrastructureProvidersResolver should be defined', () =>
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthGetInfrastructureProvidersResolver should be defined', () =>
        {
            expect(resolver).   toBeDefined();
        });

        test('should return a appHealthMockInfrastructureProviderData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockInfrastructureProviderData)));
            expect(await resolver.main()).toBe(appHealthMockInfrastructureProviderData);
        });
    });
});
