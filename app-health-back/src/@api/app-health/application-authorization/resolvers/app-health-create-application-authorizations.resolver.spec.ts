import { AppHealthCreateApplicationAuthorizationsHandler, AppHealthCreateApplicationAuthorizationsResolver } from '@api/app-health/application-authorization';
import { AppHealthCreateApplicationAuthorizationInput } from '@api/graphql';
import { appHealthMockApplicationAuthorizationData } from '@app/app-health/application-authorization';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateApplicationAuthorizationsResolver', () =>
{
    let resolver: AppHealthCreateApplicationAuthorizationsResolver;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateApplicationAuthorizationsResolver,
                {
                    provide : AppHealthCreateApplicationAuthorizationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthCreateApplicationAuthorizationsResolver>(AppHealthCreateApplicationAuthorizationsResolver);
    });

    test('AppHealthCreateApplicationAuthorizationsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthCreateApplicationAuthorizationsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an applicationAuthorizations created', async () =>
        {
            expect(await resolver.main(<AppHealthCreateApplicationAuthorizationInput[]>appHealthMockApplicationAuthorizationData)).toBe(undefined);
        });
    });
});
