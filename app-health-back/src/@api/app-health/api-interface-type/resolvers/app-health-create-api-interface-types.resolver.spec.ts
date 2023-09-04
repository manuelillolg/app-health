import { AppHealthCreateApiInterfaceTypesHandler, AppHealthCreateApiInterfaceTypesResolver } from '@api/app-health/api-interface-type';
import { AppHealthCreateApiInterfaceTypeInput } from '@api/graphql';
import { appHealthMockApiInterfaceTypeData } from '@app/app-health/api-interface-type';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateApiInterfaceTypesResolver', () =>
{
    let resolver: AppHealthCreateApiInterfaceTypesResolver;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateApiInterfaceTypesResolver,
                {
                    provide : AppHealthCreateApiInterfaceTypesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthCreateApiInterfaceTypesResolver>(AppHealthCreateApiInterfaceTypesResolver);
    });

    test('AppHealthCreateApiInterfaceTypesResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthCreateApiInterfaceTypesResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an apiInterfaceTypes created', async () =>
        {
            expect(await resolver.main(<AppHealthCreateApiInterfaceTypeInput[]>appHealthMockApiInterfaceTypeData)).toBe(undefined);
        });
    });
});
