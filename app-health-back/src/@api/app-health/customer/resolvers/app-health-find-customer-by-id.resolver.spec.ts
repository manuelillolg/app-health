/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthFindCustomerByIdHandler, AppHealthFindCustomerByIdResolver } from '@api/app-health/customer';
import { appHealthMockCustomerData } from '@app/app-health/customer';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindCustomerByIdResolver', () =>
{
    let resolver: AppHealthFindCustomerByIdResolver;
    let handler: AppHealthFindCustomerByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthFindCustomerByIdResolver,
                {
                    provide : AppHealthFindCustomerByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthFindCustomerByIdResolver>(AppHealthFindCustomerByIdResolver);
        handler = module.get<AppHealthFindCustomerByIdHandler>(AppHealthFindCustomerByIdHandler);
    });

    test('AppHealthFindCustomerByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthFindCustomerByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an customer by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockCustomerData[0])));
            expect(await resolver.main(appHealthMockCustomerData[0].id)).toBe(appHealthMockCustomerData[0]);
        });
    });
});
