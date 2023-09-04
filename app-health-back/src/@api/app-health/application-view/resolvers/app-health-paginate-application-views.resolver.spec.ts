/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthPaginateApplicationViewsHandler, AppHealthPaginateApplicationViewsResolver } from '@api/app-health/application-view';
import { appHealthMockApplicationViewData } from '@app/app-health/application-view';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthPaginateApplicationViewsResolver', () =>
{
    let resolver: AppHealthPaginateApplicationViewsResolver;
    let handler: AppHealthPaginateApplicationViewsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthPaginateApplicationViewsResolver,
                {
                    provide : AppHealthPaginateApplicationViewsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthPaginateApplicationViewsResolver>(AppHealthPaginateApplicationViewsResolver);
        handler = module.get<AppHealthPaginateApplicationViewsHandler>(AppHealthPaginateApplicationViewsHandler);
    });

    test('AppHealthPaginateApplicationViewsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthPaginateApplicationViewsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a appHealthMockApplicationViewData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : appHealthMockApplicationViewData,
            })));
            expect(await resolver.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : appHealthMockApplicationViewData,
            });
        });
    });
});
