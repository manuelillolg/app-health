import { AppHealthCreateApplicationInfrastuctureServicesHandler, AppHealthCreateApplicationInfrastuctureServicesResolver } from '@api/app-health/application-infrastructure-service';
import { AppHealthCreateApplicationInfrastructureServiceInput } from '@api/graphql';
import { appHealthMockApplicationInfrastructureServiceData } from '@app/app-health/application-infrastructure-service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateApplicationInfrastuctureServicesResolver', () =>
{
    let resolver: AppHealthCreateApplicationInfrastuctureServicesResolver;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateApplicationInfrastuctureServicesResolver,
                {
                    provide : AppHealthCreateApplicationInfrastuctureServicesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthCreateApplicationInfrastuctureServicesResolver>(AppHealthCreateApplicationInfrastuctureServicesResolver);
    });

    test('AppHealthCreateApplicationInfrastuctureServicesResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthCreateApplicationInfrastuctureServicesResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an applicationInfrastuctureServices created', async () =>
        {
            expect(await resolver.main(<AppHealthCreateApplicationInfrastructureServiceInput[]>appHealthMockApplicationInfrastructureServiceData)).toBe(undefined);
        });
    });
});
