import { AppHealthCreateCustomersHandler, AppHealthCreateCustomersResolver } from '@api/app-health/customer';
import { AppHealthCreateCustomerInput } from '@api/graphql';
import { appHealthMockCustomerData } from '@app/app-health/customer';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateCustomersResolver', () =>
{
    let resolver: AppHealthCreateCustomersResolver;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateCustomersResolver,
                {
                    provide : AppHealthCreateCustomersHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthCreateCustomersResolver>(AppHealthCreateCustomersResolver);
    });

    test('AppHealthCreateCustomersResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthCreateCustomersResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an customers created', async () =>
        {
            expect(await resolver.main(<AppHealthCreateCustomerInput[]>appHealthMockCustomerData)).toBe(undefined);
        });
    });
});
