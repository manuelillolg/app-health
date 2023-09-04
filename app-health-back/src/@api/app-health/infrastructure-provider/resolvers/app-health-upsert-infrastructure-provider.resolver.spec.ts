/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpsertInfrastructureProviderHandler, AppHealthUpsertInfrastructureProviderResolver } from '@api/app-health/infrastructure-provider';
import { AppHealthUpdateInfrastructureProviderByIdInput } from '@api/graphql';
import { appHealthMockInfrastructureProviderData } from '@app/app-health/infrastructure-provider';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpsertInfrastructureProviderResolver', () =>
{
    let resolver: AppHealthUpsertInfrastructureProviderResolver;
    let handler: AppHealthUpsertInfrastructureProviderHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpsertInfrastructureProviderResolver,
                {
                    provide : AppHealthUpsertInfrastructureProviderHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthUpsertInfrastructureProviderResolver>(AppHealthUpsertInfrastructureProviderResolver);
        handler = module.get<AppHealthUpsertInfrastructureProviderHandler>(AppHealthUpsertInfrastructureProviderHandler);
    });

    test('AppHealthUpsertInfrastructureProviderResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpsertInfrastructureProviderResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an infrastructureProvider upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockInfrastructureProviderData[0])));
            expect(await resolver.main(<AppHealthUpdateInfrastructureProviderByIdInput>appHealthMockInfrastructureProviderData[0])).toBe(appHealthMockInfrastructureProviderData[0]);
        });
    });
});
