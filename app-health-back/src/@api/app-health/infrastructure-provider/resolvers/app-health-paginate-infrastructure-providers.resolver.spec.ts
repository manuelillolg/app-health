/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthPaginateInfrastructureProvidersHandler, AppHealthPaginateInfrastructureProvidersResolver } from '@api/app-health/infrastructure-provider';
import { appHealthMockInfrastructureProviderData } from '@app/app-health/infrastructure-provider';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthPaginateInfrastructureProvidersResolver', () =>
{
    let resolver: AppHealthPaginateInfrastructureProvidersResolver;
    let handler: AppHealthPaginateInfrastructureProvidersHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthPaginateInfrastructureProvidersResolver,
                {
                    provide : AppHealthPaginateInfrastructureProvidersHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthPaginateInfrastructureProvidersResolver>(AppHealthPaginateInfrastructureProvidersResolver);
        handler = module.get<AppHealthPaginateInfrastructureProvidersHandler>(AppHealthPaginateInfrastructureProvidersHandler);
    });

    test('AppHealthPaginateInfrastructureProvidersResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthPaginateInfrastructureProvidersResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a appHealthMockInfrastructureProviderData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : appHealthMockInfrastructureProviderData,
            })));
            expect(await resolver.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : appHealthMockInfrastructureProviderData,
            });
        });
    });
});
