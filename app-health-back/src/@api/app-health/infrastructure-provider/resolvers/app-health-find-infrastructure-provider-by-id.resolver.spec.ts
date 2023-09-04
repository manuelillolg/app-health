/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthFindInfrastructureProviderByIdHandler, AppHealthFindInfrastructureProviderByIdResolver } from '@api/app-health/infrastructure-provider';
import { appHealthMockInfrastructureProviderData } from '@app/app-health/infrastructure-provider';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindInfrastructureProviderByIdResolver', () =>
{
    let resolver: AppHealthFindInfrastructureProviderByIdResolver;
    let handler: AppHealthFindInfrastructureProviderByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthFindInfrastructureProviderByIdResolver,
                {
                    provide : AppHealthFindInfrastructureProviderByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthFindInfrastructureProviderByIdResolver>(AppHealthFindInfrastructureProviderByIdResolver);
        handler = module.get<AppHealthFindInfrastructureProviderByIdHandler>(AppHealthFindInfrastructureProviderByIdHandler);
    });

    test('AppHealthFindInfrastructureProviderByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthFindInfrastructureProviderByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an infrastructureProvider by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockInfrastructureProviderData[0])));
            expect(await resolver.main(appHealthMockInfrastructureProviderData[0].id)).toBe(appHealthMockInfrastructureProviderData[0]);
        });
    });
});
