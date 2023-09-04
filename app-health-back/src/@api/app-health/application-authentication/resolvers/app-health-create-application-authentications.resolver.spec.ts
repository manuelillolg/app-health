import { AppHealthCreateApplicationAuthenticationsHandler, AppHealthCreateApplicationAuthenticationsResolver } from '@api/app-health/application-authentication';
import { AppHealthCreateApplicationAuthenticationInput } from '@api/graphql';
import { appHealthMockApplicationAuthenticationData } from '@app/app-health/application-authentication';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateApplicationAuthenticationsResolver', () =>
{
    let resolver: AppHealthCreateApplicationAuthenticationsResolver;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateApplicationAuthenticationsResolver,
                {
                    provide : AppHealthCreateApplicationAuthenticationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthCreateApplicationAuthenticationsResolver>(AppHealthCreateApplicationAuthenticationsResolver);
    });

    test('AppHealthCreateApplicationAuthenticationsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthCreateApplicationAuthenticationsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an applicationAuthentications created', async () =>
        {
            expect(await resolver.main(<AppHealthCreateApplicationAuthenticationInput[]>appHealthMockApplicationAuthenticationData)).toBe(undefined);
        });
    });
});
