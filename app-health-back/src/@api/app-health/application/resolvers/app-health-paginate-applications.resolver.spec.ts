/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthPaginateApplicationsHandler, AppHealthPaginateApplicationsResolver } from '@api/app-health/application';
import { appHealthMockApplicationData } from '@app/app-health/application';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthPaginateApplicationsResolver', () =>
{
    let resolver: AppHealthPaginateApplicationsResolver;
    let handler: AppHealthPaginateApplicationsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthPaginateApplicationsResolver,
                {
                    provide : AppHealthPaginateApplicationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthPaginateApplicationsResolver>(AppHealthPaginateApplicationsResolver);
        handler = module.get<AppHealthPaginateApplicationsHandler>(AppHealthPaginateApplicationsHandler);
    });

    test('AppHealthPaginateApplicationsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthPaginateApplicationsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a appHealthMockApplicationData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : appHealthMockApplicationData,
            })));
            expect(await resolver.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : appHealthMockApplicationData,
            });
        });
    });
});
