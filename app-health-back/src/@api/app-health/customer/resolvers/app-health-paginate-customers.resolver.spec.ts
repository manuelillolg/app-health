/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthPaginateCustomersHandler, AppHealthPaginateCustomersResolver } from '@api/app-health/customer';
import { appHealthMockCustomerData } from '@app/app-health/customer';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthPaginateCustomersResolver', () =>
{
    let resolver: AppHealthPaginateCustomersResolver;
    let handler: AppHealthPaginateCustomersHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthPaginateCustomersResolver,
                {
                    provide : AppHealthPaginateCustomersHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthPaginateCustomersResolver>(AppHealthPaginateCustomersResolver);
        handler = module.get<AppHealthPaginateCustomersHandler>(AppHealthPaginateCustomersHandler);
    });

    test('AppHealthPaginateCustomersResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthPaginateCustomersResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a appHealthMockCustomerData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : appHealthMockCustomerData,
            })));
            expect(await resolver.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : appHealthMockCustomerData,
            });
        });
    });
});
