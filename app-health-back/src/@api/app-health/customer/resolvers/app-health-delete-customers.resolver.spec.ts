/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthDeleteCustomersHandler, AppHealthDeleteCustomersResolver } from '@api/app-health/customer';
import { appHealthMockCustomerData } from '@app/app-health/customer';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteCustomersResolver', () =>
{
    let resolver: AppHealthDeleteCustomersResolver;
    let handler: AppHealthDeleteCustomersHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthDeleteCustomersResolver,
                {
                    provide : AppHealthDeleteCustomersHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthDeleteCustomersResolver>(AppHealthDeleteCustomersResolver);
        handler = module.get<AppHealthDeleteCustomersHandler>(AppHealthDeleteCustomersHandler);
    });

    test('AppHealthDeleteCustomersResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthDeleteCustomersResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an appHealthMockCustomerData deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockCustomerData)));
            expect(await resolver.main()).toBe(appHealthMockCustomerData);
        });
    });
});
