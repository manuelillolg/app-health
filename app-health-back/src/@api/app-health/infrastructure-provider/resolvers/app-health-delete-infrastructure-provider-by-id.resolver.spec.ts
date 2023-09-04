/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthDeleteInfrastructureProviderByIdHandler, AppHealthDeleteInfrastructureProviderByIdResolver } from '@api/app-health/infrastructure-provider';
import { appHealthMockInfrastructureProviderData } from '@app/app-health/infrastructure-provider';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteInfrastructureProviderByIdResolver', () =>
{
    let resolver: AppHealthDeleteInfrastructureProviderByIdResolver;
    let handler: AppHealthDeleteInfrastructureProviderByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthDeleteInfrastructureProviderByIdResolver,
                {
                    provide : AppHealthDeleteInfrastructureProviderByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthDeleteInfrastructureProviderByIdResolver>(AppHealthDeleteInfrastructureProviderByIdResolver);
        handler = module.get<AppHealthDeleteInfrastructureProviderByIdHandler>(AppHealthDeleteInfrastructureProviderByIdHandler);
    });

    test('AppHealthDeleteInfrastructureProviderByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthDeleteInfrastructureProviderByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an infrastructureProvider deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockInfrastructureProviderData[0])));
            expect(await resolver.main(appHealthMockInfrastructureProviderData[0].id)).toBe(appHealthMockInfrastructureProviderData[0]);
        });
    });
});
