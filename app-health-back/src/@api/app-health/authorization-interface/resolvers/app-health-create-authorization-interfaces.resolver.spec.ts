import { AppHealthCreateAuthorizationInterfacesHandler, AppHealthCreateAuthorizationInterfacesResolver } from '@api/app-health/authorization-interface';
import { AppHealthCreateAuthorizationInterfaceInput } from '@api/graphql';
import { appHealthMockAuthorizationInterfaceData } from '@app/app-health/authorization-interface';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateAuthorizationInterfacesResolver', () =>
{
    let resolver: AppHealthCreateAuthorizationInterfacesResolver;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateAuthorizationInterfacesResolver,
                {
                    provide : AppHealthCreateAuthorizationInterfacesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthCreateAuthorizationInterfacesResolver>(AppHealthCreateAuthorizationInterfacesResolver);
    });

    test('AppHealthCreateAuthorizationInterfacesResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthCreateAuthorizationInterfacesResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an authorizationInterfaces created', async () =>
        {
            expect(await resolver.main(<AppHealthCreateAuthorizationInterfaceInput[]>appHealthMockAuthorizationInterfaceData)).toBe(undefined);
        });
    });
});
