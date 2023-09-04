/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthPaginateApplicationDatabasesHandler, AppHealthPaginateApplicationDatabasesResolver } from '@api/app-health/application-database';
import { appHealthMockApplicationDatabaseData } from '@app/app-health/application-database';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthPaginateApplicationDatabasesResolver', () =>
{
    let resolver: AppHealthPaginateApplicationDatabasesResolver;
    let handler: AppHealthPaginateApplicationDatabasesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthPaginateApplicationDatabasesResolver,
                {
                    provide : AppHealthPaginateApplicationDatabasesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthPaginateApplicationDatabasesResolver>(AppHealthPaginateApplicationDatabasesResolver);
        handler = module.get<AppHealthPaginateApplicationDatabasesHandler>(AppHealthPaginateApplicationDatabasesHandler);
    });

    test('AppHealthPaginateApplicationDatabasesResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthPaginateApplicationDatabasesResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a appHealthMockApplicationDatabaseData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : appHealthMockApplicationDatabaseData,
            })));
            expect(await resolver.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : appHealthMockApplicationDatabaseData,
            });
        });
    });
});
