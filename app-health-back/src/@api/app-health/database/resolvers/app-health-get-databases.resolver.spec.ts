/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthGetDatabasesHandler, AppHealthGetDatabasesResolver } from '@api/app-health/database';
import { appHealthMockDatabaseData } from '@app/app-health/database';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthGetDatabasesResolver', () =>
{
    let resolver: AppHealthGetDatabasesResolver;
    let handler: AppHealthGetDatabasesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthGetDatabasesResolver,
                {
                    provide : AppHealthGetDatabasesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthGetDatabasesResolver>(AppHealthGetDatabasesResolver);
        handler = module.get<AppHealthGetDatabasesHandler>(AppHealthGetDatabasesHandler);
    });

    test('AppHealthGetDatabasesResolver should be defined', () =>
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthGetDatabasesResolver should be defined', () =>
        {
            expect(resolver).   toBeDefined();
        });

        test('should return a appHealthMockDatabaseData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockDatabaseData)));
            expect(await resolver.main()).toBe(appHealthMockDatabaseData);
        });
    });
});
