import { AppHealthCreateAuthenticationInterfacesHandler, AppHealthCreateAuthenticationInterfacesResolver } from '@api/app-health/authentication-interface';
import { AppHealthCreateAuthenticationInterfaceInput } from '@api/graphql';
import { appHealthMockAuthenticationInterfaceData } from '@app/app-health/authentication-interface';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateAuthenticationInterfacesResolver', () =>
{
    let resolver: AppHealthCreateAuthenticationInterfacesResolver;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateAuthenticationInterfacesResolver,
                {
                    provide : AppHealthCreateAuthenticationInterfacesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthCreateAuthenticationInterfacesResolver>(AppHealthCreateAuthenticationInterfacesResolver);
    });

    test('AppHealthCreateAuthenticationInterfacesResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthCreateAuthenticationInterfacesResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an authenticationInterfaces created', async () =>
        {
            expect(await resolver.main(<AppHealthCreateAuthenticationInterfaceInput[]>appHealthMockAuthenticationInterfaceData)).toBe(undefined);
        });
    });
});
