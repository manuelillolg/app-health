/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthCreateInfrastructureProviderHandler, AppHealthCreateInfrastructureProviderResolver } from '@api/app-health/infrastructure-provider';
import { AppHealthCreateInfrastructureProviderInput } from '@api/graphql';
import { appHealthMockInfrastructureProviderData } from '@app/app-health/infrastructure-provider';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateInfrastructureProviderResolver', () =>
{
    let resolver: AppHealthCreateInfrastructureProviderResolver;
    let handler: AppHealthCreateInfrastructureProviderHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthCreateInfrastructureProviderResolver,
                {
                    provide : AppHealthCreateInfrastructureProviderHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthCreateInfrastructureProviderResolver>(AppHealthCreateInfrastructureProviderResolver);
        handler = module.get<AppHealthCreateInfrastructureProviderHandler>(AppHealthCreateInfrastructureProviderHandler);
    });

    test('AppHealthCreateInfrastructureProviderResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthCreateInfrastructureProviderResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an infrastructureProvider created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockInfrastructureProviderData[0])));
            expect(await resolver.main(<AppHealthCreateInfrastructureProviderInput>appHealthMockInfrastructureProviderData[0])).toBe(appHealthMockInfrastructureProviderData[0]);
        });
    });
});
