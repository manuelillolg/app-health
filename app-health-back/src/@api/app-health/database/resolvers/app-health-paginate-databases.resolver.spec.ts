/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthPaginateDatabasesHandler, AppHealthPaginateDatabasesResolver } from '@api/app-health/database';
import { appHealthMockDatabaseData } from '@app/app-health/database';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthPaginateDatabasesResolver', () =>
{
    let resolver: AppHealthPaginateDatabasesResolver;
    let handler: AppHealthPaginateDatabasesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthPaginateDatabasesResolver,
                {
                    provide : AppHealthPaginateDatabasesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthPaginateDatabasesResolver>(AppHealthPaginateDatabasesResolver);
        handler = module.get<AppHealthPaginateDatabasesHandler>(AppHealthPaginateDatabasesHandler);
    });

    test('AppHealthPaginateDatabasesResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthPaginateDatabasesResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a appHealthMockDatabaseData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : appHealthMockDatabaseData,
            })));
            expect(await resolver.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : appHealthMockDatabaseData,
            });
        });
    });
});
