/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthFindInfrastructureProviderHandler, AppHealthFindInfrastructureProviderResolver } from '@api/app-health/infrastructure-provider';
import { appHealthMockInfrastructureProviderData } from '@app/app-health/infrastructure-provider';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindInfrastructureProviderResolver', () =>
{
    let resolver: AppHealthFindInfrastructureProviderResolver;
    let handler: AppHealthFindInfrastructureProviderHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthFindInfrastructureProviderResolver,
                {
                    provide : AppHealthFindInfrastructureProviderHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthFindInfrastructureProviderResolver>(AppHealthFindInfrastructureProviderResolver);
        handler = module.get<AppHealthFindInfrastructureProviderHandler>(AppHealthFindInfrastructureProviderHandler);
    });

    test('AppHealthFindInfrastructureProviderResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthFindInfrastructureProviderResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a infrastructureProvider', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockInfrastructureProviderData[0])));
            expect(await resolver.main()).toBe(appHealthMockInfrastructureProviderData[0]);
        });
    });
});
