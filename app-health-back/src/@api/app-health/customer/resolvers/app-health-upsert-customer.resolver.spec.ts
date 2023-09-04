/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpsertCustomerHandler, AppHealthUpsertCustomerResolver } from '@api/app-health/customer';
import { AppHealthUpdateCustomerByIdInput } from '@api/graphql';
import { appHealthMockCustomerData } from '@app/app-health/customer';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpsertCustomerResolver', () =>
{
    let resolver: AppHealthUpsertCustomerResolver;
    let handler: AppHealthUpsertCustomerHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpsertCustomerResolver,
                {
                    provide : AppHealthUpsertCustomerHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthUpsertCustomerResolver>(AppHealthUpsertCustomerResolver);
        handler = module.get<AppHealthUpsertCustomerHandler>(AppHealthUpsertCustomerHandler);
    });

    test('AppHealthUpsertCustomerResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpsertCustomerResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an customer upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockCustomerData[0])));
            expect(await resolver.main(<AppHealthUpdateCustomerByIdInput>appHealthMockCustomerData[0])).toBe(appHealthMockCustomerData[0]);
        });
    });
});
