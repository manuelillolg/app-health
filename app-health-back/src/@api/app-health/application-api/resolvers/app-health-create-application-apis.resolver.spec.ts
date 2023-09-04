import { AppHealthCreateApplicationApisHandler, AppHealthCreateApplicationApisResolver } from '@api/app-health/application-api';
import { AppHealthCreateApplicationApiInput } from '@api/graphql';
import { appHealthMockApplicationApiData } from '@app/app-health/application-api';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateApplicationApisResolver', () =>
{
    let resolver: AppHealthCreateApplicationApisResolver;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateApplicationApisResolver,
                {
                    provide : AppHealthCreateApplicationApisHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthCreateApplicationApisResolver>(AppHealthCreateApplicationApisResolver);
    });

    test('AppHealthCreateApplicationApisResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthCreateApplicationApisResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an applicationApis created', async () =>
        {
            expect(await resolver.main(<AppHealthCreateApplicationApiInput[]>appHealthMockApplicationApiData)).toBe(undefined);
        });
    });
});
