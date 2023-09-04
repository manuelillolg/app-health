import { AppHealthCreateInfrastructureServicesHandler, AppHealthCreateInfrastructureServicesResolver } from '@api/app-health/infrastructure-service';
import { AppHealthCreateInfrastructureServiceInput } from '@api/graphql';
import { appHealthMockInfrastructureServiceData } from '@app/app-health/infrastructure-service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateInfrastructureServicesResolver', () =>
{
    let resolver: AppHealthCreateInfrastructureServicesResolver;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateInfrastructureServicesResolver,
                {
                    provide : AppHealthCreateInfrastructureServicesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthCreateInfrastructureServicesResolver>(AppHealthCreateInfrastructureServicesResolver);
    });

    test('AppHealthCreateInfrastructureServicesResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthCreateInfrastructureServicesResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an infrastructureServices created', async () =>
        {
            expect(await resolver.main(<AppHealthCreateInfrastructureServiceInput[]>appHealthMockInfrastructureServiceData)).toBe(undefined);
        });
    });
});
