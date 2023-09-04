/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthPaginateApplicationApisHandler, AppHealthPaginateApplicationApisResolver } from '@api/app-health/application-api';
import { appHealthMockApplicationApiData } from '@app/app-health/application-api';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthPaginateApplicationApisResolver', () =>
{
    let resolver: AppHealthPaginateApplicationApisResolver;
    let handler: AppHealthPaginateApplicationApisHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthPaginateApplicationApisResolver,
                {
                    provide : AppHealthPaginateApplicationApisHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthPaginateApplicationApisResolver>(AppHealthPaginateApplicationApisResolver);
        handler = module.get<AppHealthPaginateApplicationApisHandler>(AppHealthPaginateApplicationApisHandler);
    });

    test('AppHealthPaginateApplicationApisResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthPaginateApplicationApisResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a appHealthMockApplicationApiData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : appHealthMockApplicationApiData,
            })));
            expect(await resolver.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : appHealthMockApplicationApiData,
            });
        });
    });
});
