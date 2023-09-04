/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthFindCustomerHandler, AppHealthFindCustomerResolver } from '@api/app-health/customer';
import { appHealthMockCustomerData } from '@app/app-health/customer';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindCustomerResolver', () =>
{
    let resolver: AppHealthFindCustomerResolver;
    let handler: AppHealthFindCustomerHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthFindCustomerResolver,
                {
                    provide : AppHealthFindCustomerHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthFindCustomerResolver>(AppHealthFindCustomerResolver);
        handler = module.get<AppHealthFindCustomerHandler>(AppHealthFindCustomerHandler);
    });

    test('AppHealthFindCustomerResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthFindCustomerResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a customer', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockCustomerData[0])));
            expect(await resolver.main()).toBe(appHealthMockCustomerData[0]);
        });
    });
});
